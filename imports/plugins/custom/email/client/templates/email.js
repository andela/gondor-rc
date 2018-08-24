import { Template } from "meteor/templating";
import Newsletter from "../containers/newsletter";
import { Components } from "@reactioncommerce/reaction-components";

Template.emailSettings2.helpers({
  EmailConfig() {
    return {
      component: Components.EmailConfig
    };
  },
  Newsletter() {
    return {
      component: Newsletter
    };
  },
  EmailLogs() {
    return {
      component: Components.EmailLogs
    };
  }
});
