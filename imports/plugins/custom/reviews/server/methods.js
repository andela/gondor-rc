import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Products } from "/lib/collections";
import { Reviews } from "../lib/collections/collections";

Meteor.methods({
  /**
   * Creates review for a product
   *
   * @param {String} userId Reviewer's id
   * @param {String} userName Reviewer's name
   * @param {String} productId Product's id
   * @param {String} details Feedback given by user
   * @param {Number} rating Rating given by user
   */
  "reviews/add"(userId, userName, productId, details, rating) {
    check(userId, String);
    check(userName, String);
    check(productId, String);
    check(details, String);
    check(rating, Number);

    Reviews.insert({
      userId,
      userName,
      productId,
      details,
      rating
    }, err => {
      if (err) {
        throw new Meteor.Error(err.message);
      }

      const totalReviews = Reviews.find({
        productId
      }).count();

      const rawReviews = Reviews.rawCollection();
      const aggregate = Meteor.wrapAsync(rawReviews.aggregate.bind(rawReviews));
      const result = aggregate([
        { $match: { productId } },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$rating"
            }
          }
        }
      ]);
      const sumOfRatings = result[0].total;
      const avgRating = sumOfRatings / totalReviews;

      Products.rawCollection()
        .update({ _id: productId }, {
          $set: {
            avgRating: Number(avgRating.toFixed(1)),
            totalReviews
          }
        })
        .catch(error => {
          throw new Meteor.Error(error.message);
        });
    });
  }
});
