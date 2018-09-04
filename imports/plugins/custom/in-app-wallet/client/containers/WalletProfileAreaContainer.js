import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Accounts } from "/lib/collections";
import WalletProfileArea from "../components/WalletProfileArea";
import { Meteor } from "meteor/meteor";

import { Promise } from "meteor/promise";

const callWithPromise = (method, id, email, amount) => {
  return new Promise((resolve, reject) => {
    Meteor.call(method, id, email, amount, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

/**
 *
 * @param {Object} props
 * @param {Function} onData Function called with props to pass
 * to the connected component on each data change
 */
const composer = (props, onData) => {
  const accountsSub = Meteor.subscribe("Accounts", Meteor.userId());

  if (accountsSub.ready()) {
    const userAccount = Accounts.findOne({
      userId: Meteor.userId()
    });

    /**
     * Makes a meteor call to fund the wallet of the current loggedIn user
     *
     * @param {Number} amount Amount to fund wallet with
     */
    const fundWallet = (amount) => {
      Meteor.call("wallet/fund", Meteor.userId(), amount);
    };

    /**
     * Makes a meteor call to transfer funds from the wallet of the current loggedIn user
     *
     * @param {Number} amount Amount to transfer from wallet
     * @param {String} email Recipient Email
     */
    const transferFunds = (email, amount) => {
      return callWithPromise("wallet/transfer", Meteor.userId(), email, amount);
    };

    onData(null, {
      balance: userAccount.walletBalance,
      fundWallet,
      transferFunds
    });
  }
};


registerComponent("WalletProfileArea", WalletProfileArea, composeWithTracker(composer));

export default composeWithTracker(composer)(WalletProfileArea);
