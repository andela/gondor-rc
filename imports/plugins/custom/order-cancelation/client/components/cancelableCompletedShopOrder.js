import React from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { Components, replaceComponent } from "@reactioncommerce/reaction-components";
import Modal from "./Modal";
// import CompletedOrderItem from "./completedOrderItem";

/**
 * @summary Displays the order breakdown for each Shop
 * @param {Object} props - React PropTypes
 * @property {String} shopName - The name of the shop
 * @property {Array} items - an array of individual items for this shop
 * @property {Function} handleDisplayMedia - A function for displaying product images
 * @property {boolean} isProfilePage - Checks if current page is profile page
 * @return {Node} React node containing the break down of the order by Shop
 */

class CancelableCompletedShopOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      showCancelModal: false
    };

    this.toggleCancelModal = this.toggleCancelModal.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
  }

  toggleCancelModal(event) {
    event.preventDefault();
    this.setState({
      showCancelModal: !this.state.showCancelModal
    });
  }

  cancelOrder(event, id) {
    event.preventDefault();
    Meteor.call("orders/cancel", id,
      (error, response) => {
        this.setState({
          showCancelModal: false
        });
        if (error) {
          Alerts.toast("Error:", error.message);
        } else if (response) {
          Alerts.toast("Order Canceled");
        }
      });
  }
  render() {
    this.shippingName = this.props.isProfilePage ? (
      <span>
        <strong>
          {this.props.shippingMethod.label}
        </strong>{this.props.shippingMethod.deliveryDate && <span> - estimated delivery {this.props.shippingMethod.deliveryDate}</span>}
      </span>
    ) : `${this.props.shippingMethod.carrier} - ${this.props.shippingMethod.label}`;
    this.items = this.props.items;
    const handleDisplayMedia = this.props.handleDisplayMedia;
    this.order = this.props.order;
    return (
      <div className="order-details-shop-breakdown">
        {this.state.showCancelModal &&
        <Modal
          id={this.order._id}
          toggleCancelModal={this.toggleCancelModal}
          cancelOrder={this.cancelOrder}
        />
        }
        {/* This is the left side / main content */}
        <div className="order-details-info-box">
          <div className="store-detail-box">
            <span className="order-details-store-title">{this.props.shopName}</span>
            <span className="order-details-shipping-name">{this.shippingName}</span>
            {
              this.order.workflow.status === "new" &&
              <span>
                <div className="order-details-cancel">
                  <a
                    className="cancel-link"
                    href=""
                    onClick={this.toggleCancelModal}
                  >
                  Cancel Order
                  </a>
                </div>
              </span>
            }
          </div>
        </div>
        <div className="order-details-info-box-topless">
          {this.items.map(function (item) {
            return <Components.CompletedOrderItem
              item={item} key={item._id}
              handleDisplayMedia={handleDisplayMedia} />;
          })}
        </div>
        {/* This is the left side / main content */}
      </div>
    );
  }
}

CancelableCompletedShopOrder.propTypes = {
  handleDisplayMedia: PropTypes.func,
  isProfilePage: PropTypes.bool,
  items: PropTypes.array,
  order: PropTypes.object,
  shippingMethod: PropTypes.object,
  shopName: PropTypes.string
};

replaceComponent("CompletedShopOrders", CancelableCompletedShopOrder);

export default CancelableCompletedShopOrder;
