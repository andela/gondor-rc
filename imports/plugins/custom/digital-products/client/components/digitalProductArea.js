import React from "react";
import PropTypes from "prop-types";
import { Reaction } from "/lib/api";
import { registerComponent } from "@reactioncommerce/reaction-components";

const DigitalProductArea = ({
  productFileExists,
  isDigital,
  toggleCheck,
  uploadProductFile,
  uploading
}) => (
  Reaction.hasOwnerAccess() &&
  <div>
    <div style={{ marginBottom: "15px" }}>
      <input
        type="checkbox"
        checked={isDigital ? "checked" : ""}
        onChange={toggleCheck}
      />
      <span style={{ paddingLeft: "10px" }}>Digital product</span>
    </div>
    {
      isDigital &&
      <div>
        <label>{productFileExists ? "Change product file" : "Upload product file" }</label>
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

DigitalProductArea.propTypes = {
  isDigital: PropTypes.bool.isRequired,
  productFileExists: PropTypes.bool.isRequired,
  toggleCheck: PropTypes.func.isRequired,
  uploadProductFile: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired
};

registerComponent("DigitalProductArea", DigitalProductArea);

export default DigitalProductArea;
