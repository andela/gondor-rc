import { Reaction } from "/server/api";

/**
 * @file Accounts core plugin: Manage how members sign into your shop
 *
 * @namespace Accounts
 */

Reaction.registerPackage({
  label: "Top Products",
  name: "top-products",
  icon: "fa fa-table",
  autoEnable: true,
  settings: {},
  registry: [ {
    route: "/top-products",
    template: "topProducts",
    name: "topproducts",
    provides: ["shortcut"],
    label: "Top Products",
    icon: "fa fa-table"
  }]
});
