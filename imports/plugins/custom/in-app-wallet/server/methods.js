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
  },

  "wallet/transfer"(senderUserId, recipientEmail, amount) {
    check(senderUserId, String);
    check(recipientEmail, String);
    check(amount, Number);

    const { walletBalance } = Accounts.findOne({
      userId: senderUserId
    });
    if (walletBalance < amount) {
      Logger.warn("Failed wallet/charge: Insufficient funds. Please fund wallet");
      return { message: "Failed wallet/charge: Insufficient funds. Please fund wallet", success: false };
    }
    const recipient = Accounts.findOne({
      "emails.0.address": recipientEmail
    });

    if (!recipient) {
      Logger.warn("There is no user by the specified email");
      return { message: "There is no user by the specified email", success: false };
    }
    let WriteResult2;

    const WriteResult1 =  Accounts.update({
      userId: senderUserId
    }, {
      $inc: {
        walletBalance: (amount * -1)
      }
    });

    if (WriteResult1 === 1) {
      WriteResult2 =  Accounts.update({
        userId: recipient._id
      }, {
        $inc: {
          walletBalance: amount
        }
      });
    } else if (!WriteResult1) {
      Logger.warn("Failed to charge sender wallet");
      return { message: "Failed to charge sender wallet", success: false };
    }
    if (!WriteResult2) {
      Logger.warn("Failed to fund recipient wallet");
      return { message: "Failed to fund recipient wallet", success: false };
    }
    return { message: `N${amount} successfully transferred to ${recipientEmail}`, success: true };
  }
});
