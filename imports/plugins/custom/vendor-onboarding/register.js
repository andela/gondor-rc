import { Reaction } from "/server/api";

/**
 * @file Accounts core plugin: Manage how members sign into your shop
 *
 * @namespace Accounts
 */

Reaction.registerPackage({
  label: "Tour the MarketPlace",
  name: "tour",
  icon: "fa fa-car",
  autoEnable: true,
  settings: {},
  registry: [{
    route: "tour",
    name: "tour",
    label: "Tour the MarketPlace",
    template: "sellerShopSettings",
    icon: "fa fa-car",
    permissions: [
      {
        label: "Tour the MarketPlace",
        permission: "createProduct"
      }
    ],
    audience: ["seller"],
    provides: ["shortcut"],
    priority: 1
  }]
});
