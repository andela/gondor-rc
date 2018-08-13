import React from "react";
import { Components, getRawComponent } from "@reactioncommerce/reaction-components";
import classnames from "classnames";
import { ReactionProduct } from "/lib/api";
import { replaceComponent } from "@reactioncommerce/reaction-components";
import { formatPriceString } from "/client/api";

const VariantForm = getRawComponent("VariantForm");

class ExtendedVariantForm extends VariantForm {
  renderVariantFields() {
    const cardName = `variant-${this.variant._id}`;

    const classNames = classnames({
      "variant-card": true,
      "active": this.isExpanded(cardName)
    });

    return (
      <Components.CardGroup>
        <Components.Card
          className={classNames}
          expandable={true}
          expanded={this.isExpanded(cardName)}
          name={cardName}
          onExpand={this.handleCardExpand}
        >
          <Components.CardHeader
            actAsExpander={true}
            i18nKeyTitle="productDetailEdit.variantDetails"
            title="Variant Details"
            isValid={this.props.validation.isValid}
          >
            {this.renderArchivedLabel()}
            <Components.Button
              icon="files-o"
              className="rui btn btn-default btn-clone-variant flat"
              tooltip="Duplicate"
              onClick={() => this.props.cloneVariant(this.variant)}
            />
            <Components.VisibilityButton
              onClick={() => this.handleVariantVisibilityToggle(this.variant)}
              bezelStyle="flat"
              primary={false}
              toggleOn={this.variant.isVisible}
            />
            {this.renderArchiveButton()}
          </Components.CardHeader>
          <Components.CardBody expandable={true}>
            <Components.TextField
              i18nKeyLabel="productVariant.title"
              i18nKeyPlaceholder="productVariant.title"
              placeholder="Label"
              label="Label"
              name="title"
              ref="titleInput"
              value={this.variant.title}
              onBlur={this.handleFieldBlur}
              onChange={this.handleFieldChange}
              onReturnKeyDown={this.handleFieldBlur}
              validation={this.props.validation}
            />
            <Components.Select
              clearable={false}
              i18nKeyLabel="productVariant.originCountry"
              i18nKeyPlaceholder="productVariant.originCountry"
              label="Origin Country"
              name="originCountry"
              ref="countryOfOriginInput"
              options={this.props.countries}
              onChange={this.handleSelectChange}
              value={this.variant.originCountry}
            />
            <div className="row">
              <div className="col-sm-6">
                <Components.TextField
                  i18nKeyLabel="productVariant.price"
                  i18nKeyPlaceholder={formatPriceString("0.00")}
                  placeholder={formatPriceString("0.00")}
                  label="Price"
                  name="price"
                  ref="priceInput"
                  value={this.variant.price}
                  style={this.props.greyDisabledFields(this.variant)}
                  disabled={this.props.hasChildVariants(this.variant)}
                  onBlur={this.handleFieldBlur}
                  onChange={this.handleFieldChange}
                  onReturnKeyDown={this.handleFieldBlur}
                  validation={this.props.validation}
                />
              </div>
              <div className="col-sm-6">
                <Components.TextField
                  i18nKeyLabel="productVariant.compareAtPrice"
                  i18nKeyPlaceholder={formatPriceString("0.00")}
                  placeholder={formatPriceString("0.00")}
                  label="Compare At Price"
                  name="compareAtPrice"
                  ref="compareAtPriceInput"
                  value={this.variant.compareAtPrice}
                  onBlur={this.handleFieldBlur}
                  onChange={this.handleFieldChange}
                  onReturnKeyDown={this.handleFieldBlur}
                  validation={this.props.validation}
                />
              </div>
            </div>
            {
              !ReactionProduct.selectedProduct().isDigital &&
              <div>
                <Components.Divider />
                <div className="row">
                  <div className="col-sm-6">
                    <Components.TextField
                      i18nKeyLabel="productVariant.width"
                      i18nKeyPlaceholder="0"
                      placeholder="0"
                      label="Width"
                      name="width"
                      ref="widthInput"
                      value={this.variant.width}
                      onBlur={this.handleFieldBlur}
                      onChange={this.handleFieldChange}
                      onReturnKeyDown={this.handleFieldBlur}
                      validation={this.props.validation}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Components.TextField
                      i18nKeyLabel="productVariant.length"
                      i18nKeyPlaceholder="0"
                      placeholder="0"
                      label="Length"
                      name="length"
                      ref="lengthInput"
                      value={this.variant.length}
                      onBlur={this.handleFieldBlur}
                      onChange={this.handleFieldChange}
                      onReturnKeyDown={this.handleFieldBlur}
                      validation={this.props.validation}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <Components.TextField
                      i18nKeyLabel="productVariant.height"
                      i18nKeyPlaceholder="0"
                      placeholder="0"
                      label="Height"
                      name="height"
                      ref="heightInput"
                      value={this.variant.height}
                      onBlur={this.handleFieldBlur}
                      onChange={this.handleFieldChange}
                      onReturnKeyDown={this.handleFieldBlur}
                      validation={this.props.validation}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Components.TextField
                      i18nKeyLabel="productVariant.weight"
                      i18nKeyPlaceholder="0"
                      placeholder="0"
                      label="Weight"
                      name="weight"
                      ref="weightInput"
                      value={this.variant.weight}
                      onBlur={this.handleFieldBlur}
                      onChange={this.handleFieldChange}
                      onReturnKeyDown={this.handleFieldBlur}
                      validation={this.props.validation}
                    />
                  </div>
                </div>
              </div>
            }
          </Components.CardBody>
        </Components.Card>

        <Components.SettingsCard
          enabled={this.state.taxable}
          expandable={true}
          i18nKeyTitle="productVariant.taxable"
          name="taxable"
          packageName={"reaction-product-variant"}
          saveOpenStateToPreferences={true}
          showSwitch={true}
          title="Taxable"
          onSwitchChange={this.handleCheckboxChange}
        >
          {this.renderTaxCodeField()}
          <Components.TextField
            i18nKeyLabel="productVariant.taxDescription"
            i18nKeyPlaceholder="productVariant.taxDescription"
            placeholder="Tax Description"
            label="Tax Description"
            name="taxDescription"
            ref="taxDescriptionInput"
            value={this.variant.taxDescription}
            onBlur={this.handleFieldBlur}
            onChange={this.handleFieldChange}
            onReturnKeyDown={this.handleFieldBlur}
            validation={this.props.validation}
          />
        </Components.SettingsCard>

        <Components.SettingsCard
          enabled={this.state.inventoryManagement}
          expandable={true}
          i18nKeyTitle="productVariant.inventoryManagement"
          name="inventoryManagement"
          packageName={"reaction-product-variant"}
          saveOpenStateToPreferences={true}
          showSwitch={true}
          title="Inventory Tracking"
          onSwitchChange={this.handleCheckboxChange}
        >
          <div className="row">
            {this.renderQuantityField()}
            <div className="col-sm-6">
              <Components.TextField
                i18nKeyLabel="productVariant.lowInventoryWarningThreshold"
                i18nKeyPlaceholder="0"
                placeholder="0"
                label="Warn At"
                name="lowInventoryWarningThreshold"
                ref="lowInventoryWarningThresholdInput"
                value={this.variant.lowInventoryWarningThreshold}
                onBlur={this.handleFieldBlur}
                onChange={this.handleFieldChange}
                onReturnKeyDown={this.handleFieldBlur}
                validation={this.props.validation}
              />
            </div>
          </div>
          <div className="row">
            {this.renderInventoryPolicyField()}
          </div>
        </Components.SettingsCard>
      </Components.CardGroup>
    );
  }
}


replaceComponent("VariantForm", ExtendedVariantForm);

export default ExtendedVariantForm;
