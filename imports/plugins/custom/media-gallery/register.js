import { Reaction } from "/server/api";

Reaction.registerPackage({
  // Label that shows up in tooltips and places where the package is accessable for settings
  label: "Media Gallery",

  // Unique name, used for pulling package data out of the database
  name: "media-gallery",

  // Auto-enable plugin, sets enabled: true in database
  autoEnable: true,

  // Settings for plugin
  settings: {},

  // Routes and other registry items related to layout
  registry: []
});
