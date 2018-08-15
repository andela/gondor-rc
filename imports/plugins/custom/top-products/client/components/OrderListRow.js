import React from "react";
import PropTypes from "prop-types";

class OrderListRow extends React.Component {
  render() {
    const { order, sn } = this.props;
    return (
      <tr>
        <td className="text-center">{sn}</td>
        <td className="text-center">{order.productName}</td>
        <td className="text-center">{order.totalQuantity}</td>
        <td className="text-center">
          {order.firstPurchaseDate.toLocaleString()}</td>
        <td className="text-center">
          {order.lastPurchaseDate.toLocaleString()}</td>
      </tr>
    );
  }
}

OrderListRow.propTypes = {
  order: PropTypes.object.isRequired,
  sn: PropTypes.number.isRequired
};

export default OrderListRow;
