import React from "react";
import { getRawComponent, replaceComponent } from "/imports/plugins/core/components/lib";
import { Router } from "/client/modules/router";
import { Meteor } from "meteor/meteor";
import { Logger }  from "/client/api";

import Modal from "./Modal";
import WelcomeSection from "./WelcomeSection";
import ProductsCategories from "./ProductsCategories";
import Slider  from "./Slider";
import TrendingProducts from "./TrendingProducts";

import onboard from "/imports/plugins/custom/vendor-onboarding/client/onboard";
import { dashboardSteps } from "/imports/plugins/custom/vendor-onboarding/client/tourSteps";

const Products = getRawComponent("Products");

class CustomLandingPage extends Products {
  constructor(props) {
    super(props);
    const show = localStorage.getItem("visited");
    this.state = {
      trendingProducts: [],
      notVisited: show === null
    };
    this.getTrendingProducts = this.getTrendingProducts.bind(this);
    this.initializeTour = this.initializeTour.bind(this);
  }

  componentDidMount() {
    this.getTrendingProducts(12);
    this.initializeTour();
    const show = localStorage.getItem("visited");
    if (show === null) {
      this.setState({
        notVisited: true
      });
    }
  }

  initializeTour() {
    setTimeout(() => {
      onboard.autoDashboardTour(dashboardSteps);
    }, 2000);
  }
  getTrendingProducts(limit) {
    Meteor.call("product/getTrendingProducts", limit, (err, res) => {
      if (err) {
        Logger.error(err);
      }

      this.setState({ trendingProducts: res });
    });
  }

  render() {
    // Force show the not-found view.
    if (this.props.showNotFound) {
      return this.renderNotFound();
    } else if (this.props.ready()) {
      // Render products grid if products are available after subscription ready.
      if (this.hasProducts) {
        return (
          <div id="container-main">
            {this.state.notVisited && <Modal />}
            {
              // Display only on index page
              (Router.getRouteName() === "index")
              &&
              (
                <div className="gdr-container-main">
                  <WelcomeSection />
                  <div className="container-fluid">
                    <h2 className="gdr-cat gdr-landingPage-title">
                        Categories
                    </h2>
                    <ProductsCategories />
                    <Slider {...this.props} products = {this.props.products} />
                  </div>
                </div>
              )
            }

            {
              (Router.getRouteName() === "index")
              &&
              (
                <div className="trending">
                  <h2 className="gdr-landingPage-title">
                    What&#39;s trending
                  </h2>
                </div>
              )
            }

            {
              (Router.getRouteName() === "index")
              &&
              (
                <TrendingProducts
                  trendingProducts={this.state.trendingProducts}
                  products = {this.props.products}
                />
              )
            }

            {(Router.getRouteName() !== "index") && this.renderProductGrid()}
            {(Router.getRouteName() !== "index") && this.renderLoadMoreProductsButton()}
            {this.renderSpinner()}
          </div>
        );
      }

      // Render not-found view if no products are available.
      return this.renderNotFound();
    }

    // Render loading component by default if no condition above matches.
    return this.renderSpinner();
  }
}

replaceComponent("Products", CustomLandingPage);

export default CustomLandingPage;
