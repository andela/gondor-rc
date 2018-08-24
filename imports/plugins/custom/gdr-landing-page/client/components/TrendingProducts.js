import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import { getTagIds as getIds } from "/lib/selectors/tags";

/** Class representing the TrendingProducts React component
 * @summary PropTypes for Product React component
*/
class TrendingProducts extends Component {
  static propTypes = {
    products: PropTypes.array,
    trendingProducts: PropTypes.array
  };

  /**
   * Checks and returns a Boolean if the `trendingProducts` or `products` array from props is not empty.
   * @return {Boolean} Boolean value `true` if `trendingProducts` or products are available, `false` otherwise.
   */
  get hasProducts() {
    const { trendingProducts, products } = this.props;

    return (Array.isArray(trendingProducts) && trendingProducts.length > 0) || (Array.isArray(products) && products.length > 0);
  }

  /**
   * Render trending product grid
   * @access protected
   * @return {Node} React node containing the `ProductGrid` component.
   */
  renderTrendingProductGrid() {
    const { trendingProducts } = this.props;

    // get the product object from each trends
    let products = trendingProducts.map(trend => trend.product);

    // use defaults products if there aren't any trending products
    if (products.length < 1) {
      products = this.props.products.slice(0, 11);
    }

    const productsByKey = {};

    if (Array.isArray(products)) {
      for (const product of products) {
        productsByKey[product._id] = product;
      }
    }

    return (
      <Components.ProductGrid
        productsByKey={productsByKey || {}}
        productIds={getIds({ tags: products })}
        canEdit={Reaction.hasPermission("createProduct")}
        products={products}
      />
    );
  }

  /**
   * Render component
   * @access protected
   * @return {Node} React node containing elements that make up the `Products` component.
   */
  render() {
    if (this.hasProducts) {
      return (
        <div id="container-main">
          {this.renderTrendingProductGrid()}
        </div>
      );
    }
  }
}

export default TrendingProducts;
