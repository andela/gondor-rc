import path from "path";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { check } from "meteor/check";
import { SSR } from "meteor/meteorhacks:ssr";
import { Accounts, Shops, Media } from "/lib/collections";
import { Logger, Reaction } from "/server/api";

export const methods = {
  /**
   * @name email/sendNewsletter
   * @method
   * @memberof Methods/Email
   * @param {string} template
   * @summary send newsletter
   * @return {Boolean} email sent or not
   */
  "email/sendNewsletter": function (template) {
    check(template, String);
    const shopId = Reaction.getShopId();

    this.unblock();

    if (!this.userId) {
      Logger.error("email/sendNewsletter: Access denied");
      throw new Meteor.Error("access-denied", "Access Denied");
    }

    const smtpUrl = Reaction.Email.getMailUrl();

    // return error if no mail provider is set
    if (!smtpUrl) {
      Logger.error("email/sendNewsletter: No Mail Provided Configured");
      throw new Meteor.Error("no-mail-provider", "No Mail Provided Configured");
    }

    // users in the app apart from admin
    const admin = new RegExp("admin", "i");
    const users = Accounts.find({ username: { $not: admin } }).fetch();

    const usersWithEmail = users.filter(user => user.emails[0]);

    const usersEmails = usersWithEmail.map(user =>  user.emails[0].address);

    // Get Shop information
    const shop = Shops.findOne(shopId);

    // Get shop logo, if available
    let emailLogo;
    if (Array.isArray(shop.brandAssets)) {
      const brandAsset = shop.brandAssets.find((asset) => asset.type === "navbarBrandImage");
      const mediaId = Media.findOne(brandAsset.mediaId);
      emailLogo = path.join(Meteor.absoluteUrl(), mediaId.url());
    } else {
      emailLogo = Meteor.absoluteUrl() + "resources/email-templates/shop-logo.png";
    }

    // handle missing root shop email
    if (!shop.emails[0].address) {
      shop.emails[0].address = "no-reply@reactioncommerce.com";
      Logger.warn("No shop email configured. Using no-reply to send mail");
      return false;
    }

    // no users or anonymous users without emails.
    if (usersEmails.length === 0) {
      const msg = "No users found. No newsletter sent.";
      Logger.warn(msg);
      throw new Meteor.Error("email-error", msg);
    }

    // Merge data into single object to pass to email template
    const dataForEmail = {
      // Shop Data
      shop: shop,
      contactEmail: shop.emails[0].address,
      homepage: Meteor.absoluteUrl(),
      emailLogo: emailLogo,
      copyrightDate: moment().format("YYYY"),
      legalName: shop.addressBook[0].company,
      physicalAddress: {
        address: shop.addressBook[0].address1 + " " + shop.addressBook[0].address2,
        city: shop.addressBook[0].city,
        region: shop.addressBook[0].region,
        postal: shop.addressBook[0].postal
      },
      shopName: shop.name,
      socialLinks: {
        display: true,
        facebook: {
          display: true,
          icon: Meteor.absoluteUrl() + "resources/email-templates/facebook-icon.png",
          link: "https://www.facebook.com"
        },
        googlePlus: {
          display: true,
          icon: Meteor.absoluteUrl() + "resources/email-templates/google-plus-icon.png",
          link: "https://plus.google.com"
        },
        twitter: {
          display: true,
          icon: Meteor.absoluteUrl() + "resources/email-templates/twitter-icon.png",
          link: "https://www.twitter.com"
        }
      }
    };

    const tpl = template === "default" ? "newsletter/default" : "newsletter/alternative";
    const subject = template === "default" ? "newsletter/default/subject" : "newsletter/alternative/subject";

    SSR.compileTemplate(tpl, Reaction.Email.getTemplate(tpl));
    SSR.compileTemplate(subject, Reaction.Email.getSubject(tpl));

    usersEmails.forEach(email => {
      Reaction.Email.send({
        to: email,
        from: `${shop.name} <${shop.emails[0].address}>`,
        subject: SSR.render(subject, dataForEmail),
        html: SSR.render(tpl, dataForEmail)
      });
    });

    return true;
  }
};

Meteor.methods(methods);
