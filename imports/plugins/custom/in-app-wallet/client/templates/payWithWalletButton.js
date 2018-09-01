import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import shortId from "shortid";
import { Reaction } from "/client/api";
import { Cart, Shops, Packages, Accounts } from "/lib/collections";

Template.payWithWalletButton.events({
  "click .pay-with-wallet-btn"() {
    const packageData = Packages.findOne({
      name: "wallet-paymentmethod",
      shopId: Reaction.getShopId()
    });

    const userAccount = Accounts.findOne({
      userId: Meteor.userId()
    });

    const amount =  parseFloat(Cart.findOne().getTotal());
    const currency =  Shops.findOne().currency;

    if (userAccount.walletBalance >= amount) {
      Meteor.call("wallet/charge", Meteor.userId(), amount);

      const paymentMethod = {
        processor: "wallet",
        paymentPackageId: packageData._id,
        paymentSettingsKey: packageData.registry[0].settingsKey,
        method: "credit",
        transactionId: shortId.generate(),
        currency,
        amount: parseFloat(Cart.findOne().getTotal()),
        riskLevel: "normal",
        status: "success",
        mode: "capture",
        createdAt: new Date(),
        transactions: [],
        metadata: {
          userId: Meteor.userId()
        }
      };
      Meteor.call("cart/submitPayment", paymentMethod);
    } else {
      Alerts.toast("Insufficient funds. Please go to your profile and fund your wallet", "error");
    }
  }
});
