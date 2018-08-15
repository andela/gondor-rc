import { BrowserPolicy } from "meteor/browser-policy-common";

BrowserPolicy.content.allowEval();
BrowserPolicy.content.allowOriginForAll("https://*.paystack.co");
BrowserPolicy.content.allowOriginForAll("http://*.paystack.co");
BrowserPolicy.content.allowOriginForAll("https://*.paystack.com");
BrowserPolicy.content.allowOriginForAll("http://*.paystack.com");
BrowserPolicy.content.allowOriginForAll("https://paystack.com");
BrowserPolicy.content.allowOriginForAll("http://paystack.com");
BrowserPolicy.content.allowOriginForAll("http://stats.pusher.com/timeline/v2/jsonp/1");


