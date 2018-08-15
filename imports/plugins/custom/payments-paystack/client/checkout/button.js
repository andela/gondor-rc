import { Meteor } from "meteor/meteor";
import { ReactiveDict } from "meteor/reactive-dict";
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Cart, Shops, Packages } from "/lib/collections";
import { PaystackClientAPI } from "../lib/paystackRestApi";
import "./button.html";

/**
 * Paystack Checkout Button
 *
 * This is the Paystack Checkout button that displays a popup,
 * provided by paystack.
 *
 * @return {undefined} no return value
 */
function checkout() {
  const instance = Template.instance();

  instance.state.set("isSubmitting", true);

  const packageData = Packages.findOne({
    name: "paystack-paymentmethod",
    shopId: Reaction.getShopId()
  });

  const handler = window.PaystackPop.setup({
    email: Meteor.user().emails[0].address,
    amount: parseFloat(Cart.findOne().getTotal()) * 100,
    currency: Shops.findOne().currency,
    key: packageData.settings["paystack-paymentmethod"].publicApiKey,
    callback: function (transaction) {
      instance.state.set("isSubmitting", false);

      if (transaction.status === "success") {
        const paymentMethod = {
          processor: "Paystack",
          paymentPackageId: packageData._id,
          paymentSettingsKey: packageData.registry[0].settingsKey,
          method: "credit",
          transactionId: transaction.trxref,
          currency: Shops.findOne().currency,
          amount: parseFloat(Cart.findOne().getTotal()),
          riskLevel: "normal",
          status: transaction.status,
          mode: "capture",
          createdAt: new Date(),
          transactions: []
        };

        paymentMethod.transactions.push({
          response: transaction.response
        });
        Meteor.call("cart/submitPayment", paymentMethod);
      }
    },
    onClose: function () {
      instance.state.set("isSubmitting", false);
    }
  });
  handler.openIframe();
}

/**
 * Paystack checkout onCreate
 * @param  {Function} function to execute when template is created
 * @return {undefined} no return value
 */
Template.paystackCheckoutButton.onCreated(function () {
  PaystackClientAPI.load();
  this.state = new ReactiveDict();
  this.state.setDefault({
    isSubmitting: false
  });
});

/**
 * Paystack checkout button helpers
 */
Template.paystackCheckoutButton.helpers({
  /**
   * Check if form is submitting
   * @return {Boolean} true if properly configured, false otherwise
   */
  isSubmitting() {
    return Template.instance().state.equals("isSubmitting", true);
  }
});

/**
 * Paystack checkout button events
 */
Template.paystackCheckoutButton.events({
  /**
   * Click Event: Express Checkout Button
   * @return {undefined} no return value
   */
  "click .js-paystack-checkout"() {
    return checkout();
  }
});
