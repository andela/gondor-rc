import React from "react";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { Badge, ClickToCopy } from "@reactioncommerce/reaction-ui";
import { getOrderRiskBadge, getOrderRiskStatus, getBillingInfo, getShippingInfo } from "../../../../core/orders/client/helpers";
import OrderSummary from "../../../../core/orders/client/components/orderSummary";


class CustomOrderSummary extends OrderSummary {
  constructor(props) {
    super(props);
    this.state = {
      rejectionReason: ""
    };

    this.getReasonForRejection = this.getReasonForRejection.bind(this);
  }

  componentDidMount() {
    this.getReasonForRejection(this.props.order._id);
  }

  getReasonForRejection(orderId) {
    Meteor.call("orders/getCancelReason", orderId,
      (error, response) => {
        if (error) {
          Alerts.toast("Error:", error.message);
        } else if (response && response.notes) {
          this.setState({ rejectionReason: response.notes[0].content });
        }
      });
  }

  render() {
    const { dateFormat, tracking, order, profileShippingAddress, printableLabels } = this.props;
    const paymentMethod = getBillingInfo(order).paymentMethod || {};
    const invoice = getBillingInfo(order).invoice || {};
    const shipmentMethod = getShippingInfo(order).shipmentMethod || {};
    const orderRisk = getOrderRiskStatus(order);

    return (
      <div>
        <div className="order-summary-form-group bg-info">
          <strong>{profileShippingAddress && profileShippingAddress.fullName}</strong>
          <div className="invoice-details">
            {order.email}
          </div>
        </div>

        <div className="roll-up-invoice-list">
          <div className="roll-up-content">
            <div>
              <Badge
                badgeSize="large"
                i18nKeyLabel={`cartDrawer.${order && order.workflow && order.workflow.status}`}
                label={order && order.workflow && order.workflow.status}
                status={this.badgeStatus()}
              />
              {orderRisk &&
                <Badge
                  badgeSize="large"
                  className={`risk-info risk-info-detail ${orderRisk}`}
                  i18nKeyLabel={`admin.orderRisk.${orderRisk}`}
                  label={orderRisk}
                  status={getOrderRiskBadge(orderRisk)}
                />
              }
            </div>

            <div className="order-summary-form-group">
              <strong data-i18n="order.orderId">Order ID</strong>
              <div className="invoice-details">
                <ClickToCopy
                  copyToClipboard={this.orderLink()}
                  displayText={order._id}
                  i18nKeyTooltip="admin.orderWorkflow.summary.copyOrderLink"
                  tooltip="Copy Order Link"
                />
              </div>
            </div>

            <div className="order-summary-form-group">
              <strong data-i18n="order.created">Created</strong>
              <div className="invoice-details">
                {moment(order.createdAt).fromNow()} | {dateFormat(order.createdAt, "MM/D/YYYY")}
              </div>
            </div>

            <div className="order-summary-form-group">
              <strong data-i18n="order.processor">Processor</strong>
              <div className="invoice-details">
                {paymentMethod && paymentMethod.processor}
              </div>
            </div>

            <div className="order-summary-form-group">
              <strong data-i18n="order.payment">Payment</strong>
              <div className="invoice-details">
                {paymentMethod.storedCard} ({invoice.total})
              </div>
            </div>

            <div className="order-summary-form-group">
              <strong data-i18n="order.transaction">Transaction</strong>
              <div className="invoice-details">
                {paymentMethod.transactionId}
              </div>
            </div>

            <div className="order-summary-form-group">
              <strong data-i18n="orderShipping.carrier">Carrier</strong>
              <div className="invoice-details">
                {shipmentMethod.carrier} - {shipmentMethod.label}
              </div>
            </div>

            <div className="order-summary-form-group">
              <strong data-i18n="orderShipping.tracking">Tracking</strong>
              <div className="invoice-details">
                {tracking()}
              </div>
            </div>

            {printableLabels() &&
              <div className="order-summary-form-group">
                <strong data-i18n="orderShipping.printLabels">Labels</strong>
                {printableLabels().shippingLabelUrl ?
                  <a className="invoice-details" href={printableLabels().shippingLabelUrl} target="_blank">
                    <span data-i18n="orderShipping.printShippingLabel">Print Shipping</span>
                  </a> :
                  <a className="invoice-details" href={printableLabels().customsLabelUrl} target="_blank">
                    <span data-i18n="orderShipping.printCustomsLabel">Print Customs</span>
                  </a>
                }
              </div>
            }
          </div>
        </div>

        {
          paymentMethod && paymentMethod.processor === "PayOnDelivery" &&
          order && order.workflow && order.workflow.status === "coreOrderWorkflow/canceled" &&
          this.state.rejectionReason &&
          <div className="order-summary-form-group rejection-reason-content">
            <strong data-i18n="orderShipping.tracking">Reason For Rejection</strong>
            <div className="invoice-details rejection-reason">
              {this.state.rejectionReason}
            </div>
          </div>
        }

        <br/>
        <div className="order-summary-form-group">
          <strong data-i18n="orderShipping.shipTo">Ship to</strong>
          <div className="invoice-details">
            <strong>Phone: </strong>{profileShippingAddress.phone}
          </div>
        </div>

        <div style={{ marginTop: 4 }}>
          <span>{profileShippingAddress.fullName}</span>
          <br/>
          <span>{profileShippingAddress.address1}</span>
          {profileShippingAddress.address2 && <span><br/>{profileShippingAddress.address2}</span>}
          <br/>
          <span>
            {profileShippingAddress.city}, {profileShippingAddress.region}, {profileShippingAddress.country} {profileShippingAddress.postal}
          </span>
        </div>
      </div>
    );
  }
}

export default CustomOrderSummary;
