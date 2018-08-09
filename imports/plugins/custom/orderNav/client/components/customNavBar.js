import React from "react";
import { getRawComponent, replaceComponent } from "@reactioncommerce/reaction-components";
import { Reaction }  from "/client/api";
const NavBar = getRawComponent("NavBar");

class CustomNavBar extends NavBar {
  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    Reaction.Router.go("/ordercomplete");
  }


  render() {
    return (
      <div className="rui navbar">
        {this.renderHamburgerButton()}
        {this.renderBrand()}
        {this.renderTagNav()}
        {this.renderSearchButton()}
        {Reaction.hasPermission("account/profile") && <div className="search" onClick={this.handleClick}>
          <a  className="rui tag link trans" href="#" >
            Order History
          </a>

        </div>}
        {this.renderNotificationIcon()}
        {this.renderLanguage()}
        {this.renderCurrency()}
        {this.renderMainDropdown()}
        {this.renderCartContainerAndPanel()}
      </div>
    );
  }
}

replaceComponent("NavBar", CustomNavBar);

export default CustomNavBar;
