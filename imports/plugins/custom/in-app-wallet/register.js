/* eslint camelcase: 0 */
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "WalletPayment",
  name: "wallet-paymentmethod",
  icon: "fa fa-credit-card-alt",
  autoEnable: true,
  settings: {
    "mode": false,
    "apiKey": "",
    "example": {
      enabled: false
    },
    "wallet-paymentmethod": {
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
      label: "Wallet Payment",
      provides: ["paymentSettings"],
      container: "dashboard",
      template: "walletSettings"
    },

    // Payment form for checkout
    {
      template: "payWithWalletButton",
      provides: ["paymentMethod"],
      icon: "fa fa-credit-card-alt"
    }
  ]
});
