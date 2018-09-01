import { Components } from "@reactioncommerce/reaction-components";
import { Template } from "meteor/templating";

Template.walletSettings.helpers({
  WalletSettings() {
    return {
      component: Components.WalletSettingsFormContainer
    };
  }
});
