import React, { Component } from "react";
import PropTypes from "prop-types";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import { Packages } from "/lib/collections";
import { TranslationProvider } from "/imports/plugins/core/ui/client/providers";
import { Reaction, i18next } from "/client/api";
import WalletSettingsForm from "../components/WalletSettingsForm";

class WalletSettingsFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secretApiKey: "",
      publicApiKey: ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (settings) => {
    const packageId = this.props.packageData._id;
    const settingsKey = this.props.packageData.registry[0].settingsKey;

    const fields = [{
      property: "secretApiKey",
      value: settings.secretApiKey
    }, {
      property: "publicApiKey",
      value: settings.publicApiKey
    }, {
      property: "support",
      value: settings.support
    }];

    this.saveUpdate(fields, packageId, settingsKey);
  }

  saveUpdate = (fields, id, settingsKey) => {
    Meteor.call("registry/update", id, settingsKey, fields, (err) => {
      if (err) {
        return Alerts.toast(i18next.t("admin.settings.saveFailed"), "error");
      }
      return Alerts.toast(i18next.t("admin.settings.saveSuccess"), "success");
    });
  }

  render() {
    const settingsKey = this.props.packageData.registry[0].settingsKey;
    return (
      <TranslationProvider>
        <WalletSettingsForm
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          settings={this.props.packageData.settings[settingsKey]}
        />
      </TranslationProvider>
    );
  }
}

WalletSettingsFormContainer.propTypes = {
  packageData: PropTypes.object
};

const composer = ({}, onData) => {
  const packagesSub = Meteor.subscribe("Packages", Reaction.getShopId());

  if (packagesSub.ready()) {
    const packageData = Packages.findOne({
      name: "wallet-paymentmethod",
      shopId: Reaction.getShopId()
    });
    onData(null, { packageData });
  }
};

registerComponent("WalletSettingsFormContainer", WalletSettingsFormContainer, composeWithTracker(composer));

export default composeWithTracker(composer)(WalletSettingsFormContainer);
