/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { AutoForm } from "meteor/aldeed:autoform";
import { $ } from "meteor/jquery";
import { Reaction } from "/client/api";
import { Cart, Shops, Packages } from "/lib/collections";
import { PayOnDelivery } from "../../lib/api";
import { PayOnDeliveryPayment } from "../../lib/collections/schemas";

import "./pay-on-delivery.html";

let submitting = false;

function uiEnd(template, buttonText) {
  template.$(":input").removeAttr("disabled");
  template.$("#btn-complete-order").text(buttonText);
  return template.$("#btn-processing").addClass("hidden");
}

function paymentAlert(errorMessage) {
  return $(".alert").removeClass("hidden").text(errorMessage);
}

function hidePaymentAlert() {
  return $(".alert").addClass("hidden").text("");
}

function handleExampleSubmitError(error) {
  const serverError = error !== null ? error.message : void 0;
  if (serverError) {
    return paymentAlert("Oops! " + serverError);
  } else if (error) {
    return paymentAlert("Oops! " + error, null, 4);
  }
}


Template.payOnDeliveryPaymentForm.helpers({
  PayOnDeliveryPayment() {
    return PayOnDeliveryPayment;
  }
});

Template.payOnDeliveryPaymentForm.events({
  "click .pay-on-delivery"(event) {
    event.preventDefault();

    submitting = true;
    const template = this.template;
    hidePaymentAlert();
    const form = {
      name: "pay-on-delivery",
      number: "5404000000000001",
      expireMonth: "12",
      expireYear: "2021",
      cvv2: "123",
      type: "pay on delivery"
    };

    const storedCard = form.type.charAt(0).toUpperCase() + form.type.slice(1) + " " + form.number.slice(-4);
    Meteor.subscribe("Packages", Reaction.getShopId());
    const packageData = Packages.findOne({
      name: "example-paymentmethod",
      shopId: Reaction.getShopId()
    });

    PayOnDelivery.authorize(form, {
      total: Cart.findOne().getTotal(),
      currency: Shops.findOne().currency
    }, function (error, transaction) {
      submitting = false;
      let paymentMethod;
      if (error) {
        handleExampleSubmitError(error);
        uiEnd(template, "Resubmit payment");
      } else {
        if (transaction.saved === true) {
          submitting = false;
          paymentMethod = {
            processor: "PayOnDelivery",
            paymentPackageId: packageData._id,
            paymentSettingsKey: packageData.registry[0].settingsKey,
            storedCard: storedCard,
            method: "credit",
            transactionId: transaction.transactionId,
            riskLevel: transaction.riskLevel,
            currency: transaction.currency,
            amount: transaction.amount,
            status: transaction.status,
            mode: "authorize",
            createdAt: new Date(),
            transactions: []
          };
          paymentMethod.transactions.push(transaction.response);
          Meteor.call("cart/submitPayment", paymentMethod);
        } else {
          handleExampleSubmitError(transaction.error);
          uiEnd(template, "Resubmit payment");
        }
      }
    });
    return false;
  }
});
