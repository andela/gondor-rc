import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Product as ProductSchema } from "/lib/collections/schemas";
import { Products } from "/lib/collections";
import { Hooks } from "/server/api";
import { registerSchema } from "/imports/plugins/core/collections/lib/registerSchema";

const ExtendedProductSchema = new SimpleSchema([
  ProductSchema,
  {
    isDigital: {
      type: Boolean,
      defaultValue: false
    },
    storagePath: {
      type: String,
      optional: true
    }
  }
]);

Hooks.Events.add("afterCoreInit", () => {
  Products.attachSchema(ExtendedProductSchema, { replace: true });
  registerSchema("Product", ExtendedProductSchema);
});
