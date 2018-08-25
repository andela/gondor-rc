import { withProps } from "recompose";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import { i18next } from "/client/api";
import Newsletter from "../components/newsletter";

const handlers = {
  /**
   * Send Newsletter
   * @param {string} template to use
   * @return {null} triggers alert
   */
  sendNewsletter(template) {
    Meteor.call("email/sendNewsletter", template, (err) => {
      if (err) {
        return Alerts.toast(i18next.t(err.reason, { error: err.reason }), "error");
      }
      return Alerts.toast(i18next.t("Newsletter sent succesfully"), "success");
    });
  }
};

registerComponent("Newsletter", Newsletter, withProps(handlers));

export default withProps(handlers)(Newsletter);
