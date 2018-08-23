import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import ReviewArea from "../components/ReviewArea";
import { Orders } from "/lib/collections";
import { ReactionProduct } from "/lib/api";
import { Reviews } from "../../lib/collections/collections";
import { Counts } from "meteor/tmeasday:publish-counts";
import { Meteor } from "meteor/meteor";

/**
 * Creates a composer function with a limit
 *
 * @param {Number} limit Pagination limit
 *
 * @returns {Function} composer function
 */
const createComposerWithLimit = (limit) => {
  /**
   * Closure with limit increaser
   *
   * @param {Number} givenLimit
   *
   * @returns {Function} limitIncreaser to be used in future paginated subscriptions
   */
  const createLimitIncreaser = (givenLimit) => {
    let currentLimit = givenLimit;

    return () => {
      currentLimit += givenLimit;

      return currentLimit;
    };
  };

  const limitIncreaser = createLimitIncreaser(limit);

  return (props, onData) => {
    const currentProductId = ReactionProduct.selectedProductId();
    const OrdersSub = Meteor.subscribe("Orders");
    const ReviewsSub = Meteor.subscribe("Reviews", limit, currentProductId);
    const currentUser = Meteor.user();

    const totalProductReviews = Counts.get("ReviewsCount");

    if (OrdersSub.ready() && ReviewsSub.ready()) {
      const reviews = Reviews.findFromPublication("Reviews", {
        productId: currentProductId
      }, {
        sort: { createdAt: -1 }
      }).fetch();

      const ordersPlacedByUser = Orders.find({
        "items.productId": currentProductId,
        "userId": currentUser._id
      }).count();

      const userHasBoughtProduct = Boolean(ordersPlacedByUser);

      /**
       * Makes a meteor call to add a review to a product
       */
      const handleReview = ({ rating, details }) => {
        Meteor.call("reviews/add",
          currentUser._id,
          currentUser.name,
          currentProductId,
          details,
          rating
        );
      };

      /**
       * Resubscribes with an increased limit to show more reviews
       */
      const loadMore = () => {
        Meteor.subscribe("Reviews", limitIncreaser(), currentProductId);
      };

      onData(null, {
        reviews,
        userHasBoughtProduct,
        currentUser,
        handleReview,
        loadMore,
        totalProductReviews
      });
    }
  };
};

const composerWithLimit = createComposerWithLimit(5);

registerComponent("ReviewArea", ReviewArea, composeWithTracker(composerWithLimit));

export default composeWithTracker(composerWithLimit)(ReviewArea);
