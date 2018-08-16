/* eslint camelcase: 0 */
// meteor modules
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
// reaction modules
import { Reaction } from "/server/api";
import { PaystackApi } from "./paystackapi";

Meteor.methods({
  /**
   * Capture a Charge
   * @param {Object} paymentData Object containing data about the transaction to capture
   * @return {Object} results normalized
   */
  "paystack/payment/capture": function (paymentData) {
    check(paymentData, Reaction.Schemas.PaymentMethod);
    const authorizationId = paymentData.transactionId;
    const amount = paymentData.amount;
    const response = PaystackApi.methods.capture.call({
      authorizationId: authorizationId,
      amount: amount
    });
    const result = {
      saved: true,
      response: response
    };
    return result;
  },

  /**
   * Create a refund
   * @param  {Object} paymentMethod object
   * @param  {Number} amount The amount to be refunded
   * @return {Object} result
   */
  "paystack/refund/create": function (paymentMethod, amount) {
    check(paymentMethod, Reaction.Schemas.PaymentMethod);
    check(amount, Number);
    const { transactionId } = paymentMethod;
    const response = PaystackApi.methods.refund.call({
      transactionId: transactionId,
      amount: amount
    });

    const results = {
      saved: true,
      response: response
    };

    return results;
  },

  /**
   * List refunds
   * @param  {Object} paymentMethod Object containing the pertinant data
   * @return {Object} result
   */
  "paystack/refund/list": function (paymentMethod) {
    check(paymentMethod, Reaction.Schemas.PaymentMethod);
    const { transactionId } = paymentMethod;
    const result = [];

    const response = PaystackApi.methods.refunds.call({
      transactionId: transactionId
    });

    for (const refund of response.refunds) {
      result.push(refund);
    }

    return result;
  }
});
