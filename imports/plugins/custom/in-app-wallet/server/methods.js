import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Accounts, Orders } from "/lib/collections";
import { Logger, Reaction } from "/server/api";

Meteor.methods({
  "wallet/payment/capture"(paymentData) {
    check(paymentData, Reaction.Schemas.PaymentMethod);
    return {
      saved: true,
      response: {}
    };
  },
  "wallet/refund/create"(paymentMethod, amount) {
    check(paymentMethod, Reaction.Schemas.PaymentMethod);
    check(amount, Number);

    const refund = {
      type: "wallet",
      currency: paymentMethod.currency,
      created: (new Date()).getTime(),
      amount
    };

    Accounts.update({
      userId: paymentMethod.metadata.userId
    }, {
      $inc: {
        walletBalance: amount
      }
    });

    Orders.update({
      "billing.paymentMethod.transactionId": paymentMethod.transactionId
    }, {
      $push: {
        refunds: refund
      }
    });

    return {
      saved: true,
      response: {}
    };
  },
  "wallet/refund/list"(paymentMethod) {
    check(paymentMethod, Reaction.Schemas.PaymentMethod);

    const { transactionId } = paymentMethod;
    const { refunds } = Orders.findOne({
      "billing.paymentMethod.transactionId": transactionId
    });

    return {
      success: true,
      transactionId,
      refunds
    };
  },
  "wallet/fund"(userId, amount) {
    check(userId, String);
    check(amount, Number);

    Accounts.update({
      userId
    }, {
      $inc: {
        walletBalance: amount
      }
    });
  },

  "wallet/charge"(userId, amount) {
    check(userId, String);
    check(amount, Number);

    const { walletBalance } = Accounts.findOne({
      userId
    });

    if (walletBalance >= amount) {
      Accounts.update({
        userId
      }, {
        $inc: {
          walletBalance: (amount * -1)
        }
      });
    } else {
      Logger.warn("Failed wallet/charge: Insufficient funds. Please fund wallet");
    }
  }
});
