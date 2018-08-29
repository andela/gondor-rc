import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Wish List",
  name: "wish-list",
  icon: "fa fa-heart-o",
  autoEnable: true,
  settings: {},
  registry: [{
    route: "/wish-list",
    template: "wishList",
    name: "wishlist",
    provides: ["shortcut"],
    label: "Wish List",
    icon: "fa fa-heart-o"
  }]
});
