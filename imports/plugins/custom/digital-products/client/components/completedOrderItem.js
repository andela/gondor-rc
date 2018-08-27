import React from "react";
import PropTypes from "prop-types";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";
import ProductFiles from "../../lib/collections/ProductFiles.js";

/**
 * @summary Shows the individual line items for a completed order
 * @param {Object} props - React PropTypes
 * @property {Object} item - An object representing each item on the order
 * @property {Function} handleDisplayMedia - a function for displaying the proper product image
 * @return {Node} React node containing each line item on an order
 */
class CompletedOrderItem extends React.Component {
  render() {
    this.item = this.props.item;
    this.handleDisplayMedia = this.props.handleDisplayMedia;
    this.itemMedia = this.handleDisplayMedia(this.item);
    this.image = this.itemMedia ? this.itemMedia.url() : "/resources/placeholder.gif";
    this.product = this.item.product;
    this.productFile = this.product.isDigital ? ProductFiles.findOne({ _id: this.product.fileId }) : {};
    return (
      <div className="row order-details-line">
        <div className="order-details-media"><img src={this.image} /></div>
        <div className="order-details-title">
          {this.item.product.title}
          <p>{this.item.variants.title}</p>
          <a href={`/product/${this.product._id}#reviews`}>
            <i>Review product</i>
          </a>
        </div>
        <div className="order-details-quantity"><span>{this.item.quantity}</span></div>
        {
          this.product.isDigital &&
            <div className="order-details-download">
              <a
                className="download-link"
                href={this.productFile.link()}
                download={this.productFile.name}
                type={this.productFile.type}
              >
                Download
              </a>
            </div>
        }
        <div className="order-details-price"><Components.Currency amount={this.item.variants.price} /></div>
      </div>
    );
  }
}


CompletedOrderItem.propTypes = {
  handleDisplayMedia: PropTypes.func,
  item: PropTypes.object
};

registerComponent("CompletedOrderItem", CompletedOrderItem);

export default CompletedOrderItem;
