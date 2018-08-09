import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { i18next, Reaction } from "/client/api";
import * as Collections from "/lib/collections";
import { Components } from "@reactioncommerce/reaction-components";

/**
 * @method isOwnerOfProfile
 * @memberof Accounts
 * @summary checks whether or not the user viewing this profile is also
 * its owner.
 * @since 1.5.0
 * @return {Boolean} - whether or not the current user is also this
 * profile's owner.
 */
function isOwnerOfProfile() {
  const targetUserId = Reaction.Router.getQueryParam("userId");
  const loggedInUserId = Meteor.userId();
  return targetUserId === undefined || targetUserId === loggedInUserId;
}

/**
 * @method getTargetAccount
 * @memberof Accounts
 * @summary gets the account of the userId in the route, or the current user.
 * @since 1.5.0
 * @return {Object} - the account of the identified user.
 */
function getTargetAccount() {
  const targetUserId = Reaction.Router.getQueryParam("userId") || Meteor.userId();
  const account = Collections.Accounts.findOne(targetUserId);

  return account;
}

Template.completedOrders.onCreated(() => {
  const template = Template.instance();

  template.userHasPassword = ReactiveVar(false);

  Meteor.call("accounts/currentUserHasPassword", (error, result) => {
    template.userHasPassword.set(result);
  });
  // hide actionView if open, doesn't relate to profile page
  Reaction.hideActionView();
});

Template.completedOrders.helpers({
  /**
   * @method doesUserExist
   * @summary confirms that a given userId belongs to an existing user.
   * @since 1.5.0
   * @return {Boolean} - whether or not a user with a given ID exists.
   * @ignore
   */
  doesUserExist() {
    const targetUserId = Reaction.Router.getQueryParam("userId");
    if (!targetUserId) {
      // If userId isn't in this route's query parameters, then a user
      // is viewing his/her own profile.
      return true;
    }
    const targetUser = Collections.Accounts.findOne(targetUserId);
    return targetUser !== undefined;
  },

  /**
   * @method isOwnerOfProfile
   * @summary checks whether or not the user viewing this profile is also
   * its owner.
   * @since 1.5.0
   * @return {Boolean} - whether or not the current user is also this profile's owner.
   * @ignore
   */
  isOwnerOfProfile() {
    return isOwnerOfProfile();
  },


  /**
   * @method ReactionAvatar
   * @summary returns a component that displays a user's avatar.
   * @since 1.5.0
   * @return {Object} - contains the component that displays a user's avatar.
   * @ignore
   */
  ReactionAvatar() {
    const account = Collections.Accounts.findOne({ _id: Meteor.userId() });
    if (account && account.profile && account.profile.picture) {
      const { picture } = account.profile;
      return {
        component: Components.ReactionAvatar,
        currentUser: true,
        src: picture
      };
    }
    return {
      component: Components.ReactionAvatar,
      currentUser: true
    };
  },

  /**
   * @method AddressBook
   * @summary returns a component for updating a user's address.
   * @since 2.0.0
   * @return {Object} - contains the component for updating a user's address.
   * @ignore
   */
  AddressBook() {
    return {
      component: Components.AddressBook
    };
  },

  /**
   * @method userHasPassword
   * @summary checks whether a user has set a password for his/her account.
   * @since 1.5.0
   * @return {Boolean} - returns true if the current user has a password and false if otherwise.
   * @ignore
   */
  userHasPassword() {
    return Template.instance().userHasPassword.get();
  },

  /**
   * @method userOrders
   * @summary returns a user's order history, up to the 25 most recent ones.
   * @since 1.5.0
   * @return {Array|null} - an array of a user's orders.
   * @ignore
   */
  userOrders() {
    const targetUserId = Reaction.Router.getQueryParam("userId") || Meteor.userId();
    const orderSub = Meteor.subscribe("AccountOrders", targetUserId);
    if (orderSub.ready()) {
      return Collections.Orders.find({
        userId: targetUserId
      }, {
        sort: {
          createdAt: -1
        },
        limit: 25
      });
    }
  },

  /**
   * @method displayName
   * @summary returns the name of a user.
   * @since 1.5.0
   * @return {String} - the name of a given user.
   * @ignore
   */
  displayName() {
    if (Reaction.Subscriptions && Reaction.Subscriptions.Account && Reaction.Subscriptions.Account.ready()) {
      const account = getTargetAccount();

      if (account) {
        if (account.name) {
          return account.name;
        } else if (account.username) {
          return account.username;
        } else if (account.profile && account.profile.name) {
          return account.profile.name;
        }
      }
    }

    if (Reaction.hasPermission("account/profile")) {
      return i18next.t("accountsUI.guest", { defaultValue: "Guest" });
    }
  },

  /**
   * @method displayEmail
   * @summary returns a user's email.
   * @since 1.5.0
   * @return {String} - the email of a given user.
   * @ignore
   */
  displayEmail() {
    if (Reaction.Subscriptions && Reaction.Subscriptions.Account && Reaction.Subscriptions.Account.ready()) {
      const account = getTargetAccount();

      if (account && Array.isArray(account.emails)) {
        const defaultEmail = account.emails.find((email) => email.provides === "default");
        return (defaultEmail && defaultEmail.address) || account.emails[0].address;
      }
    }
  }


});