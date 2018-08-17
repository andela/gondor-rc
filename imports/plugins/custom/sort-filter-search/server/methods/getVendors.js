import { Meteor } from "meteor/meteor";
import { Products } from "/lib/collections";

Meteor.methods({
  "product/getVendor": function () {
    const vendors = Products.aggregate([
      {
        $group: {
          _id: "$vendor",
          vendor: { $first: "$vendor" }
        }
      }
    ]);
    const properVendors = [{ value: "all", label: "all" }];
    vendors.map((vendor) => {
      if (vendor._id) {
        properVendors.push({
          value: vendor.vendor,
          label: vendor.vendor
        });
      }
    });
    return properVendors;
  }
});
