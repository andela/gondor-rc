import React from "react";
import { getRawComponent } from "@reactioncommerce/reaction-components";
import { replaceComponent } from "@reactioncommerce/reaction-components";

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
