import React from "react";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/client/api";
import OrderListRow from "./OrderListRow";

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      orders: [],
      productName: "",
      limit: "10"
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  /**
   * Method to handle filter box submit event
   * @param {object} event
   */
  handleSubmit(event) {
    event.preventDefault();
    this.fetchData(this.state.productName, this.state.limit);
  }

  /**
   * Method to update state with new input values on change
   * @param {object} event
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Method to call meteor method and retrieve top ordered products
   * @param {*} productName
   * @param {*} limit
   */
  fetchData(productName = "", limit = "10") {
    Meteor.call("product/getTopProducts", { productName, limit },
      (err, response) => {
        this.setState({
          orders: response
        });
      });
  }

  render() {
    if (Reaction.hasDashboardAccess()) {
      return (
        <div>
          <div className="table-responsive">
            <p className="text-center">Filter your result</p>
            <form>
              <div className="form-group">
                <label htmlFor="productname">Product Name:</label>
                <input name="productName" onChange={this.handleChange}
                  type="text" className="form-control"
                  id="productname" placeholder="Product Name" />
              </div>
              <div className="form-group">
                <label htmlFor="topNo">Limit:</label>
                <select id="limit" onChange={this.handleChange}
                  name="limit" className="form-control"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <button type="button" onClick={this.handleSubmit}
                className="btn btn-primary text-center"
              >Filter</button>
              <br />
            </form>
            <br />
          </div>
          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <th className="text-center">S/N</th>
                  <th className="text-center">Product Name</th>
                  <th className="text-center">Quantity Sold</th>
                  <th className="text-center">First Purchase Date</th>
                  <th className="text-center">Last Purchase Date</th>
                </tr>
                {this.state.orders && this.state.orders.map(function (order, i) {
                  return (
                    <OrderListRow key={i} sn={i + 1} order={order} />
                  );
                })}
                {this.state.orders.length === 0 &&
                <tr>
                  <td colSpan="5" className="text-center">
                    <h2>No Records Found</h2>
                  </td>
                </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    return (
      <div className="table-responsive">
        <h2 className="text-center">Sorry. You have no access to view this page</h2>
      </div>
    );
  }
}

export default OrderList;
