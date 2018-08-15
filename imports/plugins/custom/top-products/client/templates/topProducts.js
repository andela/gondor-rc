import { Template } from "meteor/templating";

import OrderList from "../components/OrderList";

Template.topProducts.helpers({
  getOrders() {
    return {
      component: OrderList
    };
  }
});
