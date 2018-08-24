import { Reaction } from "/server/api";
import { check, Match } from "meteor/check";
import { Counts } from "meteor/tmeasday:publish-counts";
import { FindFromPublication } from "meteor/percolate:find-from-publication";
import extensions from "../lib/layout/extensions.js";
import { Reviews } from "../lib/collections/collections";

FindFromPublication.publish("Reviews", function (limit, productId) {
  check(limit, Match.Integer);
  check(productId, String);

  if (!this.userId) {
    return this.ready();
  }

  Counts.publish(this, "ReviewsCount", Reviews.find({ productId }));

  return Reviews.find({
    productId
  }, {
    sort: { createdAt: -1 },
    limit: limit || 5
  });
});

Reaction.registerTemplate({
  name: "productDetailSimple",
  title: "Product Detail Simple Layout",
  type: "react",
  templateFor: ["pdp"],
  permissions: ["admin", "owner"],
  audience: ["anonymous", "guest"],
  template: extensions.extendedSimpleLayout
});

Reaction.registerTemplate({
  name: "productDetailTwoColumn",
  title: "Product Detail Two Column Layout",
  type: "react",
  templateFor: ["pdp"],
  permissions: ["admin", "owner"],
  audience: ["anonymous", "guest"],
  template: extensions.extendedTwoColumnLayout
});
