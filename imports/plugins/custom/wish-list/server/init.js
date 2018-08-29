import { Meteor } from "meteor/meteor";
import { WishList } from "../lib/collections/collections";

Meteor.publish("WishList", function () {
  if (!this.userId) {
    return this.ready();
  }

  return WishList.find({
    userId: this.userId
  });
});
