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
  registry: [{
    route: "/faq",
    template: "faq",
    name: "faq",
    label: "faq",
    icon: "fa fa-table",
    permissions: ["guest"]
  }]
});
