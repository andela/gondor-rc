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
const CompletedOrderItem = ({ item, handleDisplayMedia }) => {
  const itemMedia = handleDisplayMedia(item);
  const image = itemMedia ? itemMedia.url() : "/resources/placeholder.gif";
  const { product } = item;
  const productFile = product.isDigital ? ProductFiles.findOne({ _id: product.fileId }) : {};

  return (
    <div className="row order-details-line">
      <div className="order-details-media"><img src={image} /></div>
      <div className="order-details-title">
        {item.product.title}
        <p>{item.variants.title}</p>
        <a href={`/product/${product._id}#reviews`}>
          <i>Review product</i>
        </a>
      </div>
      <div className="order-details-quantity"><span>{item.quantity}</span></div>
      {
        product.isDigital &&
          <div className="order-details-download">
            <a
              className="download-link"
              href={productFile.link()}
              download={productFile.name}
              type={productFile.type}
            >
              Download
            </a>
          </div>
      }
      <div className="order-details-price"><Components.Currency amount={item.variants.price} /></div>
    </div>
  );
};


CompletedOrderItem.propTypes = {
  handleDisplayMedia: PropTypes.func,
  item: PropTypes.object
};

registerComponent("CompletedOrderItem", CompletedOrderItem);

export default CompletedOrderItem;
