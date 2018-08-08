import React from "react";
import { formatPriceString } from "/client/api";
import { replaceComponent, getRawComponent, withIsAdmin, withIsOwner } from "@reactioncommerce/reaction-components";

const ProductGridItem = getRawComponent("ProductGridItems");

class CustomProductGridItem extends ProductGridItem {
  renderRatingStars() {
    return (<div className="stars">
      <i className="fa fa-star" />
      <i className="fa fa-star" />
      <i className="fa fa-star" />
      <i className="fa fa-star" />
      <i className="fa fa-star-o" />
    </div>);
  }
  renderCustomerProductDetails() {
    const { product, displayPrice } = this.props;

    return (<div className="overlay">
      <div className="product-owner"><p>{product.vendor}</p></div>
      <div className="overlay-title">
        <p>{product.title}</p>
        <div className="currency-symbol">{formatPriceString(displayPrice())}</div>
      </div>
      <div className="rating-cart">
        {this.renderRatingStars()}
        <div className="cart">
          <i className="fa fa-heart-o" aria-hidden="true" />
        </div>
      </div>

    </div>);
  }

  renderVendorProductDetails() {
    const { product, displayPrice } = this.props;

    return (<div className="overlay admin">
      <div className="overlay-title">
        <p>{product.title}</p>
        <div className="currency-symbol">{formatPriceString(displayPrice())}</div>
      </div>
      {this.props.isSearch &&
        <div className="overlay-description">{product.description}</div>}
      <div className="rating-cart">
        {this.renderRatingStars()}
      </div>
    </div>);
  }
  renderGridContent() {
    const { product, isAdmin, isOwner } = this.props;

    return (
      <div className="grid-content">
        <a
          href={this.productURL}
          data-event-category="grid"
          data-event-action="product-click"
          data-event-label="grid product click"
          data-event-value={product._id}
          onClick={this.handleClick}
        >
          {(!isAdmin && !isOwner) && this.renderCustomerProductDetails()}
          {(isAdmin || isOwner) && this.renderVendorProductDetails()}
        </a>
      </div>
    );
  }
}

replaceComponent("ProductGridItems", CustomProductGridItem, withIsAdmin, withIsOwner);

export default CustomProductGridItem;
