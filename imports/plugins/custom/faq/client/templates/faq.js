import { Template } from "meteor/templating";

import Faq from "../components/faq";

/**
 * @description blaze template for faq
 * @method getFaq returns the faq component
 */
Template.faq.helpers({
  getFaq() {
    return {
      component: Faq
    };
  }
});
