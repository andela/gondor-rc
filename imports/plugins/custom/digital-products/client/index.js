import { Meteor } from "meteor/meteor";

export { default as DigitalProductArea } from "./components/digitalProductArea.js";
export { default as DigitalProductAreaContainer } from "./containers/digitalProductAreaContainer.js";
export { default as VariantForm } from "./components/variantForm.js";

Meteor.subscribe("files.products");
