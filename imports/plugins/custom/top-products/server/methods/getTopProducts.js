import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Orders } from "/lib/collections";


Meteor.methods({
  /**
   * Meteor method to get products with top orders in the database
   */
  "product/getTopProducts": function (filter) {
    check(filter, Object);
    const productName = filter.productName;
    const limit = Number.parseInt(filter.limit, 10);
    let result;

    if (productName) {
      const productRegex = new RegExp(productName, "i");
      result = Orders.aggregate([
        { $unwind: "$items" },
        { $match: { "workflow.status": "coreOrderWorkflow/completed" } },
        { $group: {
          _id: "$items.productId",
          productName: { $first: "$items.title" },
          firstPurchaseDate: { $first: "$createdAt" },
          lastPurchaseDate: { $last: "$createdAt" },
          totalQuantity: { $sum: "$items.quantity" },
          totalCount: { $sum: 1 }
        } },
        { $sort: { totalCount: -1 } },
        { $limit: limit },
        { $match: { productName: {
          $in: [productRegex]
        }
        } }
      ]);
    } else {
      result = Orders.aggregate([
        { $unwind: "$items" },
        { $match: { "workflow.status": "coreOrderWorkflow/completed" } },
        { $group: {
          _id: "$items.productId",
          productName: { $first: "$items.title" },
          firstPurchaseDate: { $first: "$createdAt" },
          lastPurchaseDate: { $last: "$createdAt" },
          totalQuantity: { $sum: "$items.quantity" },
          totalCount: { $sum: 1 }
        } },
        { $sort: { totalCount: -1 } },
        { $limit: limit }
      ]);
    }

    return result;
  }
});
