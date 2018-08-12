import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { Reaction } from "/client/api";
import * as Collections from "/lib/collections";

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
  }

});
