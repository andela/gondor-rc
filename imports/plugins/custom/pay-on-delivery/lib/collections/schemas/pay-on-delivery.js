import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { PackageConfig } from "/lib/collections/schemas/registry";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const PayOnDeliveryPackageConfig = new SimpleSchema([
  PackageConfig, {
    "settings.mode": {
      type: Boolean,
      defaultValue: true
    },
    "settings.apiKey": {
      type: String,
      label: "API Key",
      optional: true
    }
  }
]);

registerSchema("PayOnDeliveryPackageConfig", PayOnDeliveryPackageConfig);

export const PayOnDeliveryPayment = new SimpleSchema({
  payerName: {
    type: String,
    label: "Cardholder name"
  }
});

registerSchema("PayOnDeliveryPayment", PayOnDeliveryPayment);
