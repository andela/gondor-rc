import React from "react";
import { getRawComponent, replaceComponent } from "/imports/plugins/core/components/lib";
import { Router } from "/client/modules/router";

import WelcomeSection from "./WelcomeSection";
import ProductsCategories from "./ProductsCategories";
import Slider  from "./Slider";

const Products = getRawComponent("Products");

class CustomLandingPage extends Products {
  render() {
    // Force show the not-found view.
    if (this.props.showNotFound) {
      return this.renderNotFound();
    } else if (this.props.ready()) {
      // Render products grid if products are available after subscription ready.
      if (this.hasProducts) {
        return (
          <div id="container-main">
            {/* Display only on index page */}
            {
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

            {this.renderProductGrid()}
            {this.renderLoadMoreProductsButton()}
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
