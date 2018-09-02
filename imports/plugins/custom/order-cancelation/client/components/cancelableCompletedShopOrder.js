import React from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { Components, replaceComponent } from "@reactioncommerce/reaction-components";
import RejectDeliveryModal from "./RejectDeliveryModal";
import CancelOrderModal from "./CancelOrderModal";

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
      showCancelModal: false,
      showRejectDeliveryModal: false
    };

    this.toggleCancelModal = this.toggleCancelModal.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.renderRejectDeliveryModal = this.renderRejectDeliveryModal.bind(this);
    this.toggleRejectDeliveryModal = this.toggleRejectDeliveryModal.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  toggleCancelModal(event) {
    event.preventDefault();
    this.setState(state => ({
      showCancelModal: !state.showCancelModal
    }));
  }

  toggleRejectDeliveryModal(event) {
    event.preventDefault();
    this.setState(state => ({
      showRejectDeliveryModal: !state.showRejectDeliveryModal
    }));
  }

  cancelOrder(event) {
    event.preventDefault();
    Meteor.call("orders/cancelOrder", this.props.order, true,
      (error, response) => {
        if (error) {
          Alerts.toast("Error:", error.message || "An error occurred");
        } else if (response) {
          Alerts.toast("Order Canceled");
        }
      });
    this.setState({
      showCancelModal: false
    });
  }

  handleFormSubmit(event, id, reasonForRejection) {
    const notes = {
      content: reasonForRejection,
      userId: this.props.order.userId,
      updatedAt: new Date()
    };

    event.preventDefault();
    Meteor.call("orders/cancel-payOnDelivery", id, notes,
      (error, response) => {
        if (error) {
          Alerts.toast("Error:", error.message);
        } else if (response) {
          this.setState({
            showRejectDeliveryModal: false
          });

          Alerts.toast("Delivery Rejected!");
        }
      });
  }

  renderRejectDeliveryModal() {
    return (
      this.state.showRejectDeliveryModal &&
      <RejectDeliveryModal
        id={this.props.order._id}
        toggleRejectDeliveryModal={this.toggleRejectDeliveryModal}
        handleFormSubmit={this.handleFormSubmit}
      />
    );
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
          <CancelOrderModal
            toggleCancelModal={this.toggleCancelModal}
            cancelOrder={this.cancelOrder}
          />
        }
        {
          this.renderRejectDeliveryModal()
        }
        {/* This is the left side / main content */}
        <div className="order-details-info-box">
          <div className="store-detail-box">
            <span className="order-details-store-title">{this.props.shopName}</span>
            <span className="order-details-shipping-name">{this.shippingName}</span>
          </div>
          {
            this.order.workflow.status === "new" &&
            <div className="container cancel-link-container">
              <span>
                <div className="order-details-cancel pull-right">
                  <a
                    className="cancel-link"
                    href=""
                    onClick={this.toggleCancelModal}
                  >
                  Cancel Order
                  </a>
                </div>
              </span>
            </div>
          }
          {
            // Check if order is completed and payment method is `PayOnDelivery`
            this.order.workflow.status === "coreOrderWorkflow/completed" &&
              this.order.billing[0].paymentMethod.processor === "PayOnDelivery" &&
              <div className="container cancel-link-container">
                <span>
                  <div className="order-details-cancel pull-right">
                    <a
                      className="cancel-link"
                      href=""
                      onClick={this.toggleRejectDeliveryModal}
                    >
                      Reject Delivery
                    </a>
                  </div>
                </span>
              </div>
          }
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
