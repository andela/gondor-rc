import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Orders } from "lib/collections";

Meteor.methods({
  /**
   * Meteor method to get trending products in the database
  * @param  {Number} limit - maximum amount of products to get
  */
  "product/getTrendingProducts": function (limit = 12) {
    check(limit, Number);
    const numLimit = parseInt(limit, 10);
    const result = Orders.aggregate([
      { $unwind: "$items" },
      { $match: { "workflow.status": "coreOrderWorkflow/completed" } },
      { $group: {
        _id: "$items.productId",
        totalQuantity: { $sum: "$items.quantity" },
        product: { $first: "$items.product" }
      } },
      { $sort: { totalQuantity: -1 } },
      { $limit: numLimit }
    ]);

    return result;
  }
});

