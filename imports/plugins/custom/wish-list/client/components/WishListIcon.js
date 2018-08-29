import React, { Component } from "react";
import PropTypes from "prop-types";

/** Class representing the WishListIcon React component
 * @summary PropTypes for WishListIcon React component
 * @property {Function} handleWishListClick - handle icon click function
*/

class WishListIcon extends Component {
  static propTypes = {
    addToWishList: PropTypes.func,
    currentAccount: PropTypes.any,
    inWishList: PropTypes.bool,
    productId: PropTypes.string,
    removeFromWishList: PropTypes.func
  };

  /**
   * Add to Wish List function
   * @access protected
   * @return {void}
   */
  handleWishListClick = (event) => {
    event.stopPropagation();

    if (this.props.inWishList) {
      this.props.removeFromWishList(this.props.productId);
    } else {
      this.props.addToWishList(this.props.productId);
    }
  }

  /**
   * Render component
   * @access protected
   * @return {Node} React node containing wish list icon
   */
  render() {
    if (!this.props.currentAccount) {
      return null;
    }

    const heartClass = this.props.inWishList ? "fa fa-heart" : "fa fa-heart-o";

    return (
      <div className="cart">
        <i className={heartClass} aria-hidden="true" onClick={this.handleWishListClick} />
      </div>
    );
  }
}

export default WishListIcon;
