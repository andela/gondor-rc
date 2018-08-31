import { check } from "meteor/check";
import { Logger } from "/server/api";
import { Meteor } from "meteor/meteor";
import { Orders } from "/lib/collections";

Meteor.methods({
  "orders/cancel": function (orderId) {
    check(orderId, String);

    Orders.update({ _id: orderId },
      { $set: { "workflow.status": "coreOrderWorkflow/canceled" } },
      {}, error => {
        if (error) {
          Logger.error(error.message);
          throw new Meteor.Error(error.message);
        }
      });

    return true;
  },

  "orders/cancel-payOnDelivery": function (orderId, reasonForRejection) {
    check(orderId, String);
    check(reasonForRejection, Object);

    Orders.update({ _id: orderId },
      { $set: {
        "workflow.status": "coreOrderWorkflow/canceled",
        "notes": [reasonForRejection]
      } },
      error => {
        if (error) {
          Logger.error(error.message);
          throw new Meteor.Error(error.message);
        }
      });

    return true;
  },

  "orders/getCancelReason": function (orderId) {
    check(orderId, String);

    return Orders.findOne({
      "_id": orderId,
      "workflow.status": "coreOrderWorkflow/canceled"
    },
    { notes: 1 });
  }
});
