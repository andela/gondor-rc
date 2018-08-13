import { Meteor } from "meteor/meteor";
import ProductFiles from "../lib/collections/ProductFiles.js";

Meteor.publish("files.products", function () {
  return ProductFiles.find().cursor;
});
