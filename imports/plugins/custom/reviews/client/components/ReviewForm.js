import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
import PropTypes from "prop-types";
import ReactStars from "react-stars";

class ReviewForm extends Component {
  static propTypes = {
    handleReview: PropTypes.func.isRequired
  }

  state = {
    details: "",
    rating: 0
  }

  handleRatingsChange = (rating) => {
    this.setState({ rating });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleReview(this.state);
  }

  render() {
    return (
      <form className="review-form">
        <h4>Rate this product</h4>
        <ReactStars
          size={20}
          className="rating-stars"
          value={this.state.rating}
          half={false}
          onChange={this.handleRatingsChange}
        />
        <textarea
          className="form-control"
          name="details"
          placeholder="Write a brief review..."
          value={this.state.details}
          onChange={this.handleChange}
        />
        <button
          className="btn btn-primary review-submit"
          onClick={this.handleSubmit}
        >
        Submit
        </button>
      </form>
    );
  }
}

registerComponent("ReviewForm", ReviewForm);

export default ReviewForm;
