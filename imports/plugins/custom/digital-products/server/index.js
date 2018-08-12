import { Reaction } from "/server/api";
import { Meteor } from "meteor/meteor";
import extensions from "../lib/layout/extensions.js";
import ProductFiles from "../lib/collections/ProductFiles.js";

// import "../lib/collections/schemas";

Meteor.publish("files.products", function () {
  return ProductFiles.find().cursor;
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
