import { $ } from "meteor/jquery";
import { Template } from "meteor/templating";
import CustomSearchModalContainer from "../../../lib/containers/customSearchModalContainer";

/*
 * customSearchModal helpers
 */
Template.customSearchModal.helpers({
  customSearchModal() {
    return {
      component: CustomSearchModalContainer
    };
  }
});

/*
 * customSearchModal events
 */
Template.customSearchModal.events({
  "click [data-event-action=searchCollection]": function (event) {
    event.preventDefault();

    $(".search-type-option").not(event.target).removeClass("search-type-active");
    $(event.target).addClass("search-type-active");

    $("#search-input").focus();
  }
});
