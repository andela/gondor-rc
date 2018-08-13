import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import { ReactionProduct } from "/lib/api";
import ProductFiles from "../../lib/collections/ProductFiles.js";
import DigitalProductArea from "../components/digitalProductArea.js";
import { Logger } from "/client/api";

class DigitalProductAreaContainer extends Component {
  state = {
    isDigital: ReactionProduct.selectedProduct().isDigital,
    uploading: false
  }

  toggleCheck = () => {
    const currentProduct = ReactionProduct.selectedProduct();

    this.setState({ isDigital: !this.state.isDigital }, () => {
      Meteor.call("products/updateProductField", currentProduct._id, "isDigital", this.state.isDigital);
    });
  }

  uploadProductFile = (e) => {
    const currentProduct = ReactionProduct.selectedProduct();

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const upload = ProductFiles.insert({
        file: e.currentTarget.files[0],
        streams: "dynamic",
        chunkSize: "dynamic"
      }, false);

      upload.on("start", () => {
        this.setState({ uploading: true });
      });

      upload.on("end", (error, fileObj) => {
        if (error) {
          Logger.debug(error);
        } else {
          Alerts.toast("Product uploaded successfully");

          Meteor.call("products/updateProductField", currentProduct._id, "isDigital", true);
          Meteor.call("products/updateProductField", currentProduct._id, "fileId", fileObj._id);
          Meteor.call("products/updateProductField", currentProduct._id, "fileName", fileObj.name);

          this.setState({ uploading: false });
        }
      });

      upload.start();
    }
  }

  render() {
    const currentProduct = ReactionProduct.selectedProduct();

    return (
      <DigitalProductArea
        product={currentProduct}
        isDigital={this.state.isDigital}
        toggleCheck={this.toggleCheck}
        uploadProductFile={this.uploadProductFile}
        uploading={this.state.uploading}
      />
    );
  }
}


registerComponent("DigitalProductAreaContainer", DigitalProductAreaContainer);

export default DigitalProductAreaContainer;
