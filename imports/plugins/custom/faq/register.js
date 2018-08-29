import { Reaction } from "/server/api";

/**
 *  Register
 *
 * @namespace Accounts
 */

Reaction.registerPackage({
  label: "Faq",
  name: "faq",
  icon: "fa fa-table",
  autoEnable: true,
  settings: {},
  registry: [{
    route: "/faq",
    template: "faq",
    name: "faq",
    label: "faq",
    icon: "fa fa-table"
  }]
});
