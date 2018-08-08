import _ from "lodash";
import { replaceComponent, getRawComponent } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Router } from "/client/api";
import { Reaction, i18next } from "/client/api";

// import { ServiceConfigHelper, LoginFormSharedHelpers } from "../helpers";
import { LoginFormValidation } from "/lib/api";

const AuthContainer = getRawComponent("AuthContainer");

class MyAuth extends AuthContainer {
  constructor(props) {
    super(props);

    this.state = {
      formMessages: props.formMessages || {},
      isLoading: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit = (event, email, password, isSeller) => {
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    const errors = {};
    const username = email.trim();
    const pword = password.trim();

    const validatedEmail = LoginFormValidation.email(username);
    const validatedPassword = LoginFormValidation.password(pword, { validationLevel: "exists" });

    if (validatedEmail !== true) {
      errors.email = validatedEmail;
    }
    if (validatedPassword !== true) {
      errors.password = validatedPassword;
    }

    if (_.isEmpty(errors) === false) {
      this.setState({
        isLoading: false,
        formMessages: {
          errors: errors
        }
      });
      return;
    }

    if (this.props.currentView === "loginFormSignInView") {
      Meteor.loginWithPassword(username, pword, (error) => {
        if (error) {
          this.setState({
            isLoading: false,
            formMessages: {
              alerts: [error]
            }
          });
        } else {
          Router.go(this.props.currentRoute.route.path);
        }
      });
    } else if (this.props.currentView === "loginFormSignUpView") {
      const newUserData = {
        email: username,
        password: pword
      };

      Accounts.createUser(newUserData, (error) => {
        if (error) {
          this.setState({
            isLoading: false,
            formMessages: {
              alerts: [error]
            }
          });
        } else {
          if (isSeller === true) {
            Meteor.call("shop/createShop", Meteor.userId(), function (err, response) {
              if (err) {
                const errorMessage = i18next.t("marketplace.errorCannotCreateShop", { defaultValue: "Could not create shop for current user {{user}}" });
                return Alerts.toast(`${errorMessage} ${err}`, "error");
              }

              const success = i18next.t("marketplace.yourShopIsReady", { defaultValue: "Your shop is now ready!" });
              Reaction.setShopId(response.shopId);
              return Alerts.toast(success, "success");
            });
          }
          Router.go(this.props.currentRoute.route.path);
        }
      });
    }
  }
}
replaceComponent("AuthContainer", MyAuth);

export default MyAuth;
