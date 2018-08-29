import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Logger } from "/server/api";
import { WishList } from "../lib/collections/collections";

Meteor.methods({
  /**
   * Adds a product to the wishlist
   *
   * @param {String} productId Product's id
   */
  "wishlist/add"(productId) {
    check(productId, String);

    const currentUser = Meteor.user();
    const userId = currentUser._id;

    const wishListExists = WishList.findOne({ userId });

    if (wishListExists) {
      WishList.update({ userId }, { $push: { products: productId } }, {}, err => {
        if (err) {
          Logger.error(err.message);
          throw new Meteor.Error(err.message);
        }
      });
    } else {
      WishList.insert({ userId, products: [productId]  }, err => {
        if (err) {
          Logger.error(err.message);
          throw new Meteor.Error(err.message);
        }
      });
    }

    return true;
  },

  /**
   * Removes item from wishlist
   *
   * @param {String} productId Product's id
   */
  "wishlist/remove"(productId) {
    check(productId, String);

    const currentUser = Meteor.user();
    const userId = currentUser._id;

    WishList.update({ userId }, { $pull: { products: productId } }, err => {
      if (err) {
        Logger.error(err.message);
        throw new Meteor.Error(err.message);
      }
    });
  }
});
