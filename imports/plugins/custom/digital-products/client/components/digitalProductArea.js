import React from "react";
import PropTypes from "prop-types";
import { Reaction } from "/lib/api";
import { registerComponent } from "@reactioncommerce/reaction-components";


const DigitalProductArea = ({
  product,
  isDigital,
  toggleCheck,
  uploadProductFile,
  uploading
}) => {
  const productFileExists = Boolean(product.fileName);

  return (
    Reaction.hasOwnerAccess() &&
    <div className="digital-product-area">
      <div className="checkbox">
        <input
          type="checkbox"
          checked={isDigital ? "checked" : ""}
          onChange={toggleCheck}
        />
        <span>Digital product</span>
      </div>
      {
        isDigital &&
        <div>
          <label>
            {
              productFileExists ?
                `Change product file (${product.fileName})` :
                "Upload product file"
            }
          </label>
          <input
            type="file"
            className="form-control"
            onChange={uploadProductFile}
          />
        </div>
      }
      {
        uploading &&
        <div>
          <img width="50" src="/images/rc-loader.svg"/>
          <span>Uploading</span>
        </div>
      }
    </div>
  );
};


DigitalProductArea.propTypes = {
  isDigital: PropTypes.bool.isRequired,
  product: PropTypes.object.isRequired,
  toggleCheck: PropTypes.func.isRequired,
  uploadProductFile: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired
};

registerComponent("DigitalProductArea", DigitalProductArea);

export default DigitalProductArea;
