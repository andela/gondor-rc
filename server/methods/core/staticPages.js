import * as Collections from "/lib/collections";
import * as Schemas from "../../../lib/collections/schemas";
import { StaticPages } from "../../../lib/collections";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

Meteor.methods({
  createStaticPage: function (pageName, pageURL, pageContent, createdAt) {
    check(pageName, String);
    check(pageURL, String);
    check(pageContent, String);
    check(createdAt, Date);
    const page = {
      pageName,
      pageURL,
      pageContent,
      createdAt
    };
    check(page, Schemas.StaticPages);
    const createPage = Collections.StaticPages.insert(page);
    return createPage;
  },

  updateStaticPage: function (_id, pageName, pageURL, pageContent, createdAt, updatedAt) {
    check(_id, String);
    check(pageName, String);
    check(pageURL, String);
    check(pageContent, String);
    check(createdAt, Date);
    check(updatedAt, Date);
    const page = {
      pageName,
      pageURL,
      pageContent,
      createdAt,
      updatedAt
    };
    check(page, Schemas.StaticPages);
    const updatePage = Collections.StaticPages.update(_id, { $set: page });
    return updatePage;
  },

  // deletePage: function
  deleteStaticPage(_id) {
    check(_id, String);
    const deletePage = StaticPages.remove(_id);
    return deletePage;
  },

  // get details: function
  getStaticPage(_id) {
    check(_id, String);
    const gottenPage = Collections.StaticPages.findOne(_id);
    return gottenPage;
  },

  // get all details: function
  getAllStaticPage() {
    const gottenPages = Collections.StaticPages.find({});
    return gottenPages;
  }
});
