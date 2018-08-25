import React from "react";
import { getRawComponent } from "@reactioncommerce/reaction-components";
import { replaceComponent } from "@reactioncommerce/reaction-components";
import { Reaction }  from "/client/api";


import onboard from "/imports/plugins/custom/vendor-onboarding/client/onboard";
import { dashboardSteps } from "/imports/plugins/custom/vendor-onboarding/client/tourSteps";


const NavBar = getRawComponent("NavBar");

class ExtendedNavBar extends NavBar {
  openSearchModal = () => {
    localStorage.setItem("searchValue", this.searchInput.value);

    this.handleOpenSearchModal();
  }

  handleSearchField = (event) => {
    if (event.keyCode === 13) {
      this.openSearchModal();
    }
  }
  startTour = (event) => {
    event.preventDefault();
    onboard.manualTour(dashboardSteps);
  }
  renderTourButton() {
    if (Reaction.hasPermission("createProduct")) {
      return (
        <div className="tour">
          <button onClick={this.startTour} className="rui btn btn-default flat button" type="button" kind="flat">
            Take Tour
          </button>
        </div>
      );
    }
  }
  renderSearchBox() {
    if (this.props.searchEnabled) {
      return (
        <div className="search">
          <input
            className="form-control search-input-box"
            onKeyDown={this.handleSearchField}
            ref={elm => {this.searchInput = elm;}}
          />
          <button
            title="Search products"
            onClick={this.openSearchModal}
            className="search-button"
          >
            <i className="fa fa-search" />
          </button>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="rui navbar">
        {this.renderHamburgerButton()}
        {this.renderBrand()}
        {this.renderTagNav()}
        {this.renderSearchBox()}
        {this.renderTourButton()}
        {this.renderNotificationIcon()}
        {this.renderCurrency()}
        {this.renderMainDropdown()}
        {this.renderCartContainerAndPanel()}
      </div>
    );
  }
}

replaceComponent("NavBar", ExtendedNavBar);

export default ExtendedNavBar;
