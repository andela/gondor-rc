import SimpleMDE from "simplemde";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import { Meteor } from "meteor/meteor";
import { StaticPages } from "/lib/collections";
import "./staticPage.html";
import "../stylesheet/style.less";
import "/node_modules/simplemde/dist/simplemde.min.css";
let editor;
Template.genericForm.onRendered(() => {
  editor = new SimpleMDE({
    element: document.getElementById("content"),
    toolbar: ["bold", "italic", "heading", "heading-1", "heading-2",  "|", "quote", "unordered-list", "ordered-list", "clean-block", "link", "preview"],
    placeholder: "Enter page content...",
    spellChecker: true,
    autoDownloadFontAwesome: false,
    renderingConfig: {
      singleLineBreaks: false,
      codeSyntaxHighlighting: true
    }
  });
});
Template.manageStaticPage.onCreated(function () {
  this.autorun(() => {
    this.subscribe("StaticPages");
  });
});
Template.manageStaticPage.helpers({
  alreadyAddedPages() {
    const instance = Template.instance();
    if (instance.subscriptionsReady()) {
      return StaticPages.find({});
    }
  }
});
Template.genericForm.events({
  "submit form": event => {
    event.preventDefault();
    const field = event.target;
    const pageName = field.pageName.value;
    const pageURL = field.pageUrl.value;
    const pageContent = editor.value();
    let createdAt = new Date();
    const updatedAt = new Date();
    if (pageName === "" || pageURL === "" || pageContent === "") {
      return Alerts.toast("Please provide all fields", "error");
    }
    if (
      $(".static-page")
        .attr("id") === undefined
    ) {
      const checkPageDetails = StaticPages.findOne({ $or: [{ pageName: pageName }, { pageURL: pageURL }] });
      if (checkPageDetails) {
        return Alerts.toast("The page name/address exists already", "error");
      }
      Meteor.call("createStaticPage", pageName, pageURL, pageContent, createdAt, function (err) {
        if (err) {
          Alerts.toast(err.message, "error");
        } else {
          Alerts.toast("Page Successfully Created", "success");
        }
      });
    } else {
      const _id = $(".static-page")
        .attr("id");
      const pageDetails = StaticPages.find({ _id }).fetch();
      if (pageDetails.length > 0) {
        createdAt = pageDetails[0].createdAt;
        // Update the data in the database
        Meteor.call("updateStaticPage", _id, pageName, pageURL, pageContent, createdAt, updatedAt, function (err) {
          if (err) {
            Alerts.toast(err.message, "error");
          } else {
            Alerts.toast("Page Successfully Modified", "success");
          }
        });
      } else {
        Alerts.toast("Oops! Page Not Found, Please create a new Static Page", "error");
      }
      $(".static-page")
        .attr("id", "");
      $(".static-page")
        .find(".save-static-page")
        .html("Create Page");
    }
    field.pageName.value = "";
    field.pageUrl.value = "";
    editor.value("");
  }
});
Template.manageStaticPage.events({
  "click .deleteStaticPage"(event) {
    event.preventDefault();
    event.stopPropagation();
    // confirm delete
    Alerts.alert(
      {
        title: "Are you sure you want to remove this page?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Yes"
      },
      confirmed => {
        if (confirmed) {
          const _id = $(event.currentTarget)
            .parents("tr")
            .attr("id");
          Meteor.call("deleteStaticPage", _id);
        }
        return false;
      }
    );
  },
  "click .editStaticPage"(event) {
    event.preventDefault();
    event.stopPropagation();
    const _id = $(event.currentTarget)
      .parents("tr")
      .attr("id");
    const pageDetails = StaticPages.find({ _id }).fetch();
    $(".static-page")
      .find("#page-title")
      .val(pageDetails[0].pageName);
    $(".static-page")
      .find("#page-url")
      .val(pageDetails[0].pageURL);
    $(".static-page")
      .attr("id", pageDetails[0]._id);
    editor.value(pageDetails[0].pageContent);
    $(".static-page")
      .find("#button")
      .html("Update");
  }
});
