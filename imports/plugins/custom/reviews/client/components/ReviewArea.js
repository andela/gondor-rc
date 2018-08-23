import React, { Component } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import ReactStars from "react-stars";
import { Reaction } from "/lib/api";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import ReviewsPagination from "./ReviewsPagination";

class ReviewArea extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    handleReview: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalProductReviews: PropTypes.number.isRequired,
    userHasBoughtProduct: PropTypes.bool.isRequired
  }

  /**
   * Checks if the current user has the right to review the current product
   *
   * @returns {Boolean}
   */
  userCanReview = () => {
    const {
      currentUser,
      userHasBoughtProduct
    } = this.props;

    return !Reaction.hasOwnerAccess() &&
      currentUser &&
      userHasBoughtProduct;
  }

  render() {
    const {
      reviews,
      loadMore,
      totalProductReviews,
      currentUser,
      handleReview,
      product
    } = this.props;
    return (
      <div className="reviews" id="reviews">
        {
          this.userCanReview() &&
          <ReviewForm handleReview={handleReview} />
        }
        <h3>Reviews</h3>
        <div className="average-rating">
          <span>Average rating: </span>
          <ReactStars
            size={15}
            value={product.avgRating}
            edit={false}
            className="product-card-ratings"
          />
          <span>({product.avgRating})</span>
        </div>
        <div className="latest-reviews">
          {
            isEmpty(reviews)
              ? <div>This product has no reviews.</div>
              : reviews.map(review => (
                <ReviewItem
                  key={review._id}
                  review={review}
                  currentUser={currentUser}
                />))
          }
          {
            isEmpty(reviews) ||
            <ReviewsPagination
              reviews={reviews}
              totalProductReviews={totalProductReviews}
              loadMore={loadMore}
            />
          }
        </div>
      </div>
    );
  }
}


export default ReviewArea;
