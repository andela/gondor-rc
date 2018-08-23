import React from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
import PropTypes from "prop-types";

const ReviewsPagination = ({
  reviews,
  totalProductReviews,
  loadMore
}) => (
  <div className="load-more-reviews">
    <p className=".pagination-info">
      {`Displaying ${reviews.length} of ${totalProductReviews} review${totalProductReviews ? "s" : "" }`}
    </p>
    {
      reviews.length !== totalProductReviews &&
    <button
      onClick={loadMore}
      className="btn btn-default load-more-btn"
    >
      Load more
    </button>
    }
  </div>
);

ReviewsPagination.propTypes = {
  loadMore: PropTypes.func.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalProductReviews: PropTypes.number.isRequired
};

registerComponent("ReviewsPagination", ReviewsPagination);

export default ReviewsPagination;
