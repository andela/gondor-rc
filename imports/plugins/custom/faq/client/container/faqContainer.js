import { compose, withProps } from "recompose";
import { Meteor } from "meteor/meteor";
import { Router } from "/client/modules/router/";
import { Media } from "/lib/collections";
import { registerComponent } from "@reactioncommerce/reaction-components";
import Faq from "../components/faq";

registerComponent("faq", Faq);

export default compose()(Faq);
