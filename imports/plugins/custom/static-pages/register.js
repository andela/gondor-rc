import { Reaction } from "/server/api";
Reaction.registerPackage({
  label: "Static Pages",
  name: "static",
  icon: "fa fa-file",
  autoEnable: true,
  settings: {
    name: "Static Pages"
  },
  registry: [
    {
      provides: ["dashboard"],
      name: "static",
      label: "Static Pages",
      description: "Create Static Page",
      icon: "fa fa-file",
      priority: 1,
      container: "custom",
      template: "staticPage"
    }
  ]
});
