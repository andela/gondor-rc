import { Reaction } from "/server/api";

/**
 * @file Accounts core plugin: Manage how members sign into your shop
 *
 * @namespace Accounts
 */

Reaction.registerPackage({
  label: "Completed Orders",
  name: "completed-orders",
  icon: "fa fa-ticket",
  autoEnable: true,
  settings: {},
  registry: [{
    route: "/ordercomplete",
    template: "completedOrders",
    name: "ordercomplete",
    label: "Order History",
    icon: "fa fa-ticket",
    provides: ["userAccountDropdown"]
  }]
});
