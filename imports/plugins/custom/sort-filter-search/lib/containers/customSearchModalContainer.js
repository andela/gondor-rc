import React, { Component } from "react";
import { compose } from "recompose";
import _ from "lodash";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/client/api";
import { replaceComponent } from "@reactioncommerce/reaction-components";
import SearchSubscription from "./searchSubscription";

function tagToggle(arr, val) {
  if (arr.length === _.pull(arr, val).length) {
    arr.push(val);
  }
  return arr;
}

const wrapComponent = (Comp) => (
  class SearchModalContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collection: "products",
        value: localStorage.getItem("searchValue") || "",
        sorters: [{ property: "all", value: "default" },
          { property: "all", value: "default" }],
        priceFilter: "all",
        vendor: [],
        vendorFilter: "all",
        renderChild: true,
        facets: []
      };
      this.handleSort = this.handleSort.bind(this);
      this.handlePriceFilter = this.handlePriceFilter.bind(this);
      this.getVendors = this.getVendors.bind(this);
    }

    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        this.setState({
          renderChild: false
        });
      }
    }

    handleChange = (event, value) => {
      localStorage.setItem("searchValue", value);

      this.setState({ value });
    }

    handleClick = () => {
      localStorage.setItem("searchValue", "");
      this.setState({ value: "" });
    }

    handleAccountClick = (event) => {
      Reaction.Router.go("account/profile", {}, { userId: event._id });
      this.handleChildUnmount();
    }

    handleTagClick = (tagId) => {
      const newFacet = tagId;
      const element = document.getElementById(tagId);
      element.classList.toggle("active-tag");

      this.setState({
        facets: tagToggle(this.state.facets, newFacet)
      });
    }

    handleToggle = (collection) => {
      this.setState({ collection });
    }
    handleSort(value, pos) {
      const newSort = this.state.sorters.slice();
      newSort[pos] = JSON.parse(value);
      this.setState({ sorters: newSort });
    }
    handlePriceFilter(value) {
      this.setState({ priceFilter: value });
    }

    handleVendorFilter = (value) => {
      this.setState({ vendorFilter: value.toString() });
    }

    getVendors = () => {
      Meteor.call("product/getVendor", (err, res) => {
        this.setState({ vendor: res });
      });
    }

    handleChildUnmount = () =>  {
      this.setState({ renderChild: false });
    }

    render() {
      return (
        <div>
          {this.state.renderChild ?
            <div className="rui search-modal js-search-modal">
              <Comp
                handleChange={this.handleChange}
                handleSort={this.handleSort}
                handlePriceFilter={this.handlePriceFilter}
                handleVendorFilter={this.handleVendorFilter}
                handleClick={this.handleClick}
                handleToggle={this.handleToggle}
                handleAccountClick={this.handleAccountClick}
                handleTagClick={this.handleTagClick}
                value={this.state.value}
                unmountMe={this.handleChildUnmount}
                searchCollection={this.state.collection}
                facets={this.state.facets}
                sorters={this.state.sorters}
                priceFilter={this.state.priceFilter}
                vendorFilter={this.state.vendorFilter}
                vendor={this.state.vendor}
                getVendors={this.getVendors}
              />
            </div> : null
          }
        </div>
      );
    }
  }
);

replaceComponent("SearchSubscription", SearchSubscription, [ wrapComponent ]);

export default compose(wrapComponent)(SearchSubscription);
