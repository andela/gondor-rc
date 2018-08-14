import { check } from "meteor/check";
import { Logger } from "/server/api";
import { Meteor } from "meteor/meteor";
import ProductFiles from "../../lib/collections/ProductFiles.js";

Meteor.methods({
  "products/removeFile"(fileId) {
    check(fileId, String);

    ProductFiles.remove({ _id: fileId },  err => {
      if (err) {
        Logger.debug(err);
      }
    });
  }
});
