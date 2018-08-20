import { PayOnDeliverySettingsFormContainer } from "../containers";
import { Template } from "meteor/templating";
import "./pay-on-delivery.html";

Template.payOnDeliverySettings.helpers({
  PayOnDeliverySettings() {
    return {
      component: PayOnDeliverySettingsFormContainer
    };
  }
});
