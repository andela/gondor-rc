/* eslint camelcase: 0 */
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "PaystackPayment",
  name: "paystack-paymentmethod",
  icon: "fa fa-credit-card-alt",
  autoEnable: true,
  settings: {
    "mode": false,
    "secretApiKey": "",
    "publicApiKey": "",
    "example": {
      enabled: false
    },
    "paystack-paymentmethod": {
      enabled: true,
      support: [
        "Authorize",
        "Capture",
        "Refund"
      ],
      secretApiKey: "sk_test_ded3c90cd927cffc8dd794e2f8e171f6e49b04ba",
      publicApiKey: "pk_test_3dcac092b856b81203007190861ddb7de68fea04"
    }
  },
  registry: [
    // Settings panel
    {
      label: "Paystack Payment", // this key (minus spaces) is used for translations
      provides: ["paymentSettings"],
      container: "dashboard",
      template: "paystackSettings"
    },

    // Payment form for checkout
    {
      template: "paystackCheckoutButton",
      provides: ["paymentMethod"],
      icon: "fa fa-credit-card-alt"
    }
  ]
});
