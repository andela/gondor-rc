import { Reaction } from "/server/api";

/**
 * @file Accounts core plugin: Manage how members sign into your shop
 *
 * @namespace Accounts
 */

Reaction.registerPackage({
  label: "Completed Orders",
  name: "completed-orders",
  autoEnable: true,
  settings: {},
  registry: [ {
    route: "/ordercomplete",
    template: "completedOrders",
    name: "ordercomplete",
    label: "CompletedOrder"
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "coreWorkflow",
    collection: "Accounts",
    theme: "default",
    enabled: true,
    structure: {
      template: "orderNavbar",
      layoutHeader: "NavBar",
      layoutFooter: "",
      notFound: "notFound"
    }
  }]
});
