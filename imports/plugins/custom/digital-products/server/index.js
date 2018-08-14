import { Reaction } from "/server/api";
import extensions from "../lib/layout/extensions.js";
import "./methods/digital-products-methods.js";
import "./security/digital-products-security.js";
import "./init.js";

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
