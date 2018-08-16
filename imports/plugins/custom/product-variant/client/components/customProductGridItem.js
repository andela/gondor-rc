import React from "react";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon } from "react-share";
import { formatPriceString } from "/client/api";
import { replaceComponent, getRawComponent, withIsAdmin, withIsOwner } from "@reactioncommerce/reaction-components";

const ProductGridItem = getRawComponent("ProductGridItems");

class CustomProductGridItem extends ProductGridItem {
  constructor() {
    super();
    this.state = {
      isClicked: false
    };
  }
  showIcons = () => {
    this.setState({
      isClicked: !this.state.isClicked
    });
  }
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

  handleMouseEnter = () => this.socialShare.classList.add("slideIn");

  handleMouseLeave = () => this.socialShare.classList.remove("slideIn");

  render() {
    const productItem = (
      <li
        className={`product-grid-item ${this.renderPinned()} ${this.props.weightClass()} ${this.props.isSelected()}`}
        data-id={this.props.product._id}
        id={this.props.product._id}
      >
        <div
          className={this.renderHoverClassName()}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <span className="product-grid-item-alerts" />

          <a className="product-grid-item-images"
            href={this.props.pdpPath()}
            data-event-category="grid"
            data-event-label="grid product click"
            data-event-value={this.props.product._id}
            onDoubleClick={this.handleDoubleClick}
            onClick={this.handleClick}
          >
            <div className={`product-primary-images ${this.renderVisible()}`}>
              {this.renderMedia()}
              {this.renderOverlay()}
            </div>

            {this.renderAdditionalMedia()}
          </a>
          <div className="social-share"
            ref={elm => this.socialShare = elm}

          >
            <div className="share-icon-container">
              <i onClick={this.showIcons} className="fa fa-share-alt" />
            </div>
            <div className={this.state.isClicked ? "social-icon-container" : "social-icon-container hide"}>
              <div className="social-icons">
                <div className="social-icon">
                  <FacebookShareButton url={`${location.origin}${this.props.pdpPath()}`}>
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>
                </div>
                <div className="social-icon">
                  <TwitterShareButton url={`${location.origin}${this.props.pdpPath()}`}>
                    <TwitterIcon size={32} round={true} />
                  </TwitterShareButton>
                </div>
                <div className="social-icon">
                  <WhatsappShareButton url={`${location.origin}${this.props.pdpPath()}`}>
                    <WhatsappIcon size={32} round={true} />
                  </WhatsappShareButton>
                </div>
              </div>
            </div>
          </div>
          {!this.props.isSearch && this.renderNotices()}
          {this.renderGridContent()}
        </div>
      </li>
    );

    if (this.props.canEdit) {
      return (
        this.props.connectDropTarget(
          this.props.connectDragSource(productItem)
        )
      );
    }

    return productItem;
  }
}

replaceComponent("ProductGridItems", CustomProductGridItem, withIsAdmin, withIsOwner);

export default CustomProductGridItem;
