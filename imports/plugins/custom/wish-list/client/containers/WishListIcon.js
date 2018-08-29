import { withProps, compose } from "recompose";
import { registerComponent, withCurrentAccount, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import { i18next } from "/client/api";
import WishListIcon from "../components/WishListIcon";
import { WishList } from "../../lib/collections/collections";

const handlers = {
  /**
   * Add to Wishlist
   * @param {string} productId
   * @return {null} triggers alert
   */
  addToWishList(productId) {
    Meteor.call("wishlist/add", productId, (err) => {
      if (err) {
        return Alerts.toast(i18next.t(err.reason, { error: err.reason }), "error");
      }
      return Alerts.toast(i18next.t("Item Added to WishList Successfully"), "success");
    });
  },

  /**
   * Remove from Wishlist
   * @param {string} productId
   * @return {null} triggers alert
   */
  removeFromWishList(productId) {
    Meteor.call("wishlist/remove", productId, (err) => {
      if (err) {
        return Alerts.toast(i18next.t(err.reason, { error: err.reason }), "error");
      }
      return Alerts.toast(i18next.t("Item Removed from WishList Successfully"), "success");
    });
  }
};

function composer(props, onData) {
  window.prerenderReady = false;

  const wishListSub = Meteor.subscribe("WishList");
  const user = Meteor.user();

  if (wishListSub.ready()) {
    window.prerenderReady = true;
  }

  let inWishList = false;

  if (user) {
    const wishListItem = WishList.findOne({ userId: user._id });

    if (wishListItem) {
      inWishList = wishListItem.products.includes(props.productId);
    }
  }


  onData(null, {
    inWishList
  });
}

registerComponent("WishListIcon", WishListIcon, [withCurrentAccount, composeWithTracker(composer), withProps(handlers)]);

export default compose(
  withCurrentAccount,
  composeWithTracker(composer),
  withProps(handlers)
)(WishListIcon);
