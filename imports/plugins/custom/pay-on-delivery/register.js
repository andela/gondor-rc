/* eslint camelcase: 0 */
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Pay-On-Delivery",
  name: "pay-on-delivery",
  icon: "fa fa-credit-card-alt",
  autoEnable: true,
  settings: {
    "mode": false,
    "apiKey": "",
    "pay-on-delivery": {
      enabled: false
    },
    "payOnDelivery-paymentmethod": {
      enabled: false,
      support: [
        "Authorize",
        "Capture",
        "Refund"
      ]
    }
  },
  registry: [
    // Settings panel
    {
      label: "Pay On Delivery", // this key (minus spaces) is used for translations
      provides: ["paymentSettings"],
      container: "dashboard",
      template: "payOnDeliverySettings"
    },

    // Payment form for checkout
    {
      template: "payOnDeliveryPaymentForm",
      provides: ["paymentMethod"],
      icon: "fa fa-credit-card-alt"
    }
  ]
});


