import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Logger, Reaction } from "/server/api";
import { Shops, Packages } from "/lib/collections";
import axios from "axios";

const packageData = Packages.findOne({
  name: "paystack-paymentmethod",
  shopId: Reaction.getShopId()
});


// You should not implement ThirdPartyAPI. It is supposed to represent your third party API
// And is called so that it can be stubbed out for testing. This would be a library
// like Stripe or Authorize.net usually just included with a NPM.require

const ThirdPartyAPI = {
  capture: function (authorizationId, amount) {
    return {
      authorizationId: authorizationId,
      amount: amount,
      success: true
    };
  },
  refund: function (transactionId, amount) {
    const apiKey = packageData.settings["paystack-paymentmethod"].secretApiKey;

    return axios({
      method: "post",
      url: "https://api.paystack.co/refund",
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      data: {
        amount,
        transaction: transactionId,
        currency: Shops.findOne().currency,
        customer_note: transactionId //eslint-disable-line
      }
    }).then(() => {
      return {
        success: true,
        transactionId: transactionId,
        amount: amount
      };
    }).catch((error) => {
      Logger.warn("Failed paystack/refund/create", error);
      return {
        success: false,
        error: `Cannot issue refund: ${error.message}`
      };
    });
  },
  listRefunds: function (transactionId) {
    const apiKey = packageData.settings["paystack-paymentmethod"].secretApiKey;

    return axios({
      method: "get",
      url: "https://api.paystack.co/refund",
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      data: {
        reference: transactionId,
        currency: Shops.findOne().currency
      }
    }).then((response) => {
      const result = response.data.data.find((item) => {
        return item.customer_note === transactionId;
      });

      const refunds = [];

      if (result) {
        const refund = {
          type: "refund",
          amount: result.amount,
          created: new Date(result.created_at),
          currency: result.currency,
          raw: result
        };

        refunds.push(refund);
      }

      return {
        success: true,
        transactionId,
        refunds
      };
    }).catch((error) => {
      Logger.warn("Failed paystack/refund/list", error);
      return {
        success: false,
        error: error
      };
    });
  }
};

// This is the "wrapper" functions you should write in order to make your code more
// testable. You can either mirror the API calls or normalize them to the authorize/capture/refund/refunds
// that Reaction is expecting
export const PaystackApi = {};
PaystackApi.methods = {};

PaystackApi.methods.capture = new ValidatedMethod({
  name: "PaystackApi.methods.capture",
  validate: new SimpleSchema({
    authorizationId: { type: String },
    amount: { type: Number, decimal: true }
  }).validator(),
  run(args) {
    const transactionId = args.authorizationId;
    const amount = args.amount;
    const results = ThirdPartyAPI.capture(transactionId, amount);
    return results;
  }
});


PaystackApi.methods.refund = new ValidatedMethod({
  name: "PaystackApi.methods.refund",
  validate: new SimpleSchema({
    transactionId: { type: String },
    amount: { type: Number, decimal: true  }
  }).validator(),
  run(args) {
    const transactionId = args.transactionId;
    const amount = args.amount;
    return ThirdPartyAPI.refund(transactionId, amount).then((response) => {
      return response;
    });
  }
});


PaystackApi.methods.refunds = new ValidatedMethod({
  name: "PaystackApi.methods.refunds",
  validate: new SimpleSchema({
    transactionId: { type: String }
  }).validator(),
  run(args) {
    const { transactionId } = args;
    return ThirdPartyAPI.listRefunds(transactionId).then((response) => {
      return response;
    });
  }
});
