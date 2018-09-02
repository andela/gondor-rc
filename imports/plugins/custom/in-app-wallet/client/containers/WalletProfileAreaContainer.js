import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Accounts } from "/lib/collections";
import WalletProfileArea from "../components/WalletProfileArea";
import { Meteor } from "meteor/meteor";

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

    onData(null, {
      balance: userAccount.walletBalance,
      fundWallet
    });
  }
};


registerComponent("WalletProfileArea", WalletProfileArea, composeWithTracker(composer));

export default composeWithTracker(composer)(WalletProfileArea);
