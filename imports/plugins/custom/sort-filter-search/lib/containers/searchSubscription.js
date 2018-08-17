import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { createSorter } from "../util/sort";
import { filterByPrice } from "../util/filter";
import * as Collections from "/lib/collections";
import { Components, composeWithTracker } from "@reactioncommerce/reaction-components";
import CustomSearchModal from "../components/customSearchModal";

class SearchSubscription extends Component {
  render() {
    return (
      <CustomSearchModal {...this.props}/>
    );
  }
}

function getSiteName() {
  const shop = Collections.Shops.findOne();
  return typeof shop === "object" && shop.name ? shop.name : "";
}


function getProductHashtags(productResults) {
  const foundHashtags = {}; // Object to keep track of results for O(1) lookup
  return productResults.reduce((hashtags, product) => {
    if (Array.isArray(product.hashtags)) {
      product.hashtags.forEach((tag) => {
        // If we haven't added this tag yet, push it and add it to the foundHashtags dict
        if (!foundHashtags[tag]) {
          hashtags.push(tag);
          foundHashtags[tag] = true;
        }
      });
    }
    return hashtags;
  }, []);
}

function composer(props, onData) {
  const searchResultsSubscription = Meteor.subscribe("SearchResults", props.searchCollection, props.value, props.facets);
  const shopMembersSubscription = Meteor.subscribe("ShopMembers");

  if (searchResultsSubscription.ready() && shopMembersSubscription.ready()) {
    const siteName = getSiteName();
    let productResults = [];
    let tagSearchResults = [];
    let accountResults = [];

    /*
    * Product Search
    */
    if (props.searchCollection === "products") {
      productResults = Collections.ProductSearch.find().fetch();
      if (productResults.length) {
        if (Array.isArray(props.sorters) && props.sorters.length) {
          productResults = productResults.sort(createSorter(...props.sorters));
        }
      }
      const productHashtags = getProductHashtags(productResults);
      tagSearchResults = Collections.Tags.find({
        _id: { $in: productHashtags }
      }).fetch();
    }


    /*
    * Product Filter by Price
    */
    if (props.priceFilter !== "all") {
      let range = props.priceFilter.split("-");
      range = range.map((limit) => {
        return Number(limit);
      });
      productResults = filterByPrice(productResults, range);
    }
    /*
    * Product Filter by Vendor
    */
    if (props.vendorFilter !== "all") {
      productResults = productResults.filter((product) => {
        return product.vendor === props.vendorFilter;
      });
    }

    /*
      * Account Search
      */
    if (props.searchCollection === "accounts") {
      accountResults = Collections.AccountSearch.find().fetch();
    }

    onData(null, {
      siteName,
      products: productResults,
      accounts: accountResults,
      tags: tagSearchResults
    });
  }
}

export default composeWithTracker(composer, Components.Loading)(SearchSubscription);
