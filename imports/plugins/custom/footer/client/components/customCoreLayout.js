import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Components, replaceComponent } from "@reactioncommerce/reaction-components";
import Footer from "./footer";
import Blaze from "meteor/gadicc:blaze-react-component";
import { Template } from "meteor/templating";

const CustomCoreLayout = ({ actionViewIsOpen, structure }) => {
  const { layoutFooter, template } = structure || {};

  const pageClassName = classnames({
    "page": true,
    "show-settings": actionViewIsOpen
  });

  return (
    <div className={pageClassName} id="reactionAppContainer">
      <Components.NavBar />

      <Blaze template="cartDrawer" className="reaction-cart-drawer" />

      { Template[template] &&
        <main>
          <Blaze template={template} />
        </main>
      }

      { Template[layoutFooter] &&
        <Blaze template={layoutFooter} className="reaction-navigation-footer footer-default" />
      }
      <Footer />
    </div>
  );
};

CustomCoreLayout.propTypes = {
  actionViewIsOpen: PropTypes.bool,
  data: PropTypes.object,
  structure: PropTypes.object
};

replaceComponent("coreLayout", CustomCoreLayout);

export default CustomCoreLayout;
