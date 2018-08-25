import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import { Button } from "/imports/plugins/core/ui/client/components";


class Newsletter extends Component {
  state = {
    selected: "default"
  }

  handleOptionChange = event => {
    this.setState({
      selected: event.target.value
    });
  }

  handleButtonClick = () => {
    return this.props.sendNewsletter(this.state.selected);
  }

  renderSelectButtons = () => {
    return (
      <div>
        <div className="newsletter-checkbox">
          <label>
            <input type="checkbox" value="default"
              checked={this.state.selected === "default"}
              onChange={this.handleOptionChange}
            />
            &nbsp;Default
          </label>
        </div>
        <div className="newsletter-checkbox">
          <label>
            <input type="checkbox" value="alternative"
              checked={this.state.selected === "alternative"}
              onChange={this.handleOptionChange}
            />
               &nbsp;Alternative
          </label>
        </div>
      </div>
    );
  }

  renderNewsletterOptions = () => {
    return (
      <div>
        <h4>Send a Newsletter to All Registered Users.</h4>
        <br />
        <p>Please select a template to use for this newsletter</p>
        <h5>Ensure that you have modified the template selected below in the template settings to suit your needs.</h5>
        {this.renderSelectButtons()}
        <br />
        <Button
          label="Send Newsletter"
          className="newsletter-btn"
          onClick={this.handleButtonClick}
        />
      </div>
    );
  }

  render() {
    return (
      <Components.CardGroup>
        <Components.Card>
          <Components.CardHeader
            actAsExpander={true}
            title="Newsletter"
          />
          <Components.CardBody expandable={true}>
            {this.renderNewsletterOptions()}
          </Components.CardBody>
        </Components.Card>
      </Components.CardGroup>
    );
  }
}

Newsletter.propTypes = {
  sendNewsletter: PropTypes.func.isRequired
};

export default Newsletter;
