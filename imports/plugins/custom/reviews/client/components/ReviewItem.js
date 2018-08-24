import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
import ReactStars from "react-stars";
import PropTypes from "prop-types";
import timeAgoInWords from "../utils/timeAgoInWords";

class ReviewItem extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    review: PropTypes.object.isRequired
  }

  /**
   * Checks if the reviewer is the current logged in user and returns `you` instead of the name in that case
   *
   * @param {String} name Reviewer's name
   *
   * @returns {String}
   */
  displayReviewerName = (name) => {
    const { currentUser } = this.props;
    return name === currentUser.name
      ? "You"
      : name;
  }

  render() {
    const { review } = this.props;
    return (
      <div className="review">
        <div className="review-header">
          <span>
            <b>
              {this.displayReviewerName(review.userName)}
            </b>
          </span>
          <span className="reviewed-at">
            {timeAgoInWords(review.createdAt)}
          </span>
          <ReactStars
            size={10}
            value={review.rating}
            edit={false}
          />
        </div>
        <div>{review.details}</div>
      </div>
    );
  }
}

registerComponent("ReviewItem", ReviewItem);

export default ReviewItem;
