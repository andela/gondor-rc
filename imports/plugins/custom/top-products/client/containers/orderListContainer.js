import { compose, withProps } from "recompose";
import { Meteor } from "meteor/meteor";
import { Router } from "/client/modules/router/";
import { Media } from "/lib/collections";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import OrderList from "../components/OrderList";


function composer(props, onData) {
  // Get user order from props
  const orders = props.orders;
  console.log('orders:', orders);
  // const orders = [1, 2, 3, 4, 5, 6];
  const allOrdersInfo = [];

  if (orders.length > 0) {
    orders.map((order) => {
      allOrdersInfo.push(order);
    });
    onData(null, {
      allOrdersInfo
    });
  } else {
    onData(null, {
      orders
    });
  }
}


registerComponent("OrderList", OrderList, [
  composeWithTracker(composer)
]);

export default compose(
  composeWithTracker(composer)
)(OrderList);
