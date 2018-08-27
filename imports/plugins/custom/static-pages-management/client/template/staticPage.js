import { StaticPages } from "/lib/collections";
import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { Router } from "/client/api";
import marked from "marked";
import "../stylesheets/style.less";

Template.staticPages.helpers({
  staticPage() {
    const current = Router.current();
    const pageURL = current.params.pageURL;
    const subscription = Meteor.subscribe("StaticPages");
    if (subscription.ready()) {
      const page = StaticPages.find({ pageURL }).fetch();
      const { pageContent, pageName } = page[0];
      const markedContent = marked(pageContent);
      return { title: pageName, content: markedContent };
    }
  }
});
