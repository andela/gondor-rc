import {  withProps } from "recompose";
import { Meteor } from "meteor/meteor";
import { handlers, composer } from "/imports/plugins/core/accounts/client/containers/mainDropdown.js";
import { Session } from "meteor/session";
import { Tags } from "/lib/collections";
import { getRawComponent,
  composeWithTracker,
  replaceComponent,
  withCurrentAccount } from "@reactioncommerce/reaction-components";
import { Reaction, Logger }  from "/client/api";

import onboard from "/imports/plugins/custom/vendor-onboarding/client/onboard";
import { dashboardSteps } from "/imports/plugins/custom/vendor-onboarding/client/tourSteps";

const MainDropdownComponent = getRawComponent("MainDropdown");

function handleChange(event, value) {
  event.preventDefault();

  if (value === "logout") {
    return Meteor.logout((error) => {
      if (error) {
        Logger.error(error, "Failed to logout.");
      }
    });
  }

  if (value.name === "createProduct") {
    Reaction.setUserPreferences("reaction-dashboard", "viewAs", "administrator");
    Meteor.call("products/createProduct", (error, productId) => {
      let currentTag;
      let currentTagId;

      if (error) {
        throw new Meteor.Error("createProduct error", error);
      } else if (productId) {
        currentTagId = Session.get("currentTag");
        currentTag = Tags.findOne(currentTagId);
        if (currentTag) {
          Meteor.call("products/updateProductTags", productId, currentTag.name, currentTagId);
        }
        // go to new product
        Reaction.Router.go("product", {
          handle: productId
        });
      }
    });
  } else if (value.name === "tour" && Reaction.hasPermission("createProduct")) {
    onboard.manualTour(dashboardSteps);
  } else if (value.route === "/wish-list" && !Reaction.hasPermission("createProduct")) {
    Reaction.Router.go("/wish-list");
  } else if (value.route === "/ordercomplete") {
    Reaction.Router.go("/ordercomplete");
  } else if (value.route === "/top-products") {
    Reaction.Router.go("/top-products");
  } else if (value.name !== "account/profile") {
    return Reaction.showActionView(value);
  } else if (value.route || value.name) {
    const route = value.name || value.route;
    return Reaction.Router.go(route);
  }
}

// replace the default handler to use custom one;
handlers.handleChange = handleChange;

// finally replace the custom main drop down,
replaceComponent("MainDropdown", MainDropdownComponent, [
  withCurrentAccount,
  withProps(handlers),
  composeWithTracker(composer, false)
]);


