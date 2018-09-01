import { Template } from "meteor/templating";
import { Components } from "@reactioncommerce/reaction-components";

Template.accountProfile.helpers({
  WalletProfileArea() {
    return {
      component: Components.WalletProfileArea
    };
  }
});

Template.custom_accountProfile.replaces("accountProfile");
