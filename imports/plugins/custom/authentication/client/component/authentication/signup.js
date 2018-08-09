import React from "react";
import { Components, replaceComponent, getRawComponent } from "@reactioncommerce/reaction-components";

const SignUp = getRawComponent("SignUp");

class MySignUp extends SignUp {
  constructor(props) {
    super(props);

    this.state = {
      seller: false
    };
  }

  handleSubmit = (event) => {
    if (this.props.onFormSubmit) {
      this.props.onFormSubmit(event, this.state.email, this.state.password, this.state.seller);
    }
  }

  seller = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  renderForm(emailClasses, passwordClasses) {
    if (this.props.hasPasswordService()) {
      return (
        <form className="login-form" onSubmit={this.handleSubmit} noValidate>

          {this.renderFormMessages()}

          <div className={emailClasses}>
            <Components.TextField
              i18nKeyLabel="accountsUI.emailAddress"
              label="Email"
              name="email"
              type="email"
              id={`email-${this.props.uniqueId}`}
              value={this.state.email}
              onChange={this.handleFieldChange}
            />
            {this.renderEmailErrors()}
          </div>

          <div className={passwordClasses}>
            <Components.TextField
              i18nKeyLabel="accountsUI.password"
              label="Password"
              name="password"
              type="password"
              id={`password-${this.props.uniqueId}`}
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
            {this.renderPasswordErrors()}
          </div>
          <div>
            <input
              type="checkbox"
              checked={this.state.seller}
              name="seller"
              onChange={this.seller}
            />
            <label className="reg-label" htmlFor="seller"> Register as a seller</label>
          </div>
          <div className="form-group">
            {this.renderSpinnerOnWait()}
          </div>

          <div className="form-group btn-signin">
            <span onClick={this.props.onSignInClick}>Already have an account?  </span>
            <Components.Button
              tagName="span"
              className={{
                "btn": false,
                "btn-default": false
              }}
              label="Sign In"
              i18nKeyLabel="accountsUI.signIn"
              data-event-category="accounts"
              onClick={this.props.onSignInClick}
            />
          </div>
        </form>
      );
    }
  }
}

replaceComponent("SignUp", MySignUp);

export default MySignUp;
