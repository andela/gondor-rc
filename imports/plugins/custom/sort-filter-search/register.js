import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Filter Sort Search UI",
  name: "custom-ui-search",
  icon: "fa fa-hand-lizard-o",
  autoEnable: true,
  registry: [
    {
      name: "Search Sort Filter Modal",
      provides: ["ui-search"],
      template: "customSearchModal",
      permissions: [
        {
          label: "Filter Sort Search UI",
          permission: "guest"
        }
      ]
    }
  ]
});
