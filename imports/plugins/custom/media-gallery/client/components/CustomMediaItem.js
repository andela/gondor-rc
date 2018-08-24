import React from "react";
import classnames from "classnames";
import { getRawComponent, replaceComponent } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import Loupe from "../packages/loupe";

/* eslint-disable no-new */

const MediaItem = getRawComponent("MediaItem");

class CustomMediaItem extends MediaItem {
  componentDidMount() {
    new Loupe(document.getElementById("image"));
  }

  componentWillReceiveProps() {
    new Loupe(document.getElementById("image"));
  }

  renderImage() {
    const image = (
      <img
        id="image"
        alt="product image"
        className="img-responsive"
        src={this.source}
        height={this.props.mediaHeight}
      />
    );

    return image;
  }

  render() {
    const classes = { "gallery-image": true, "admin-gallery-image": Reaction.hasAdminAccess() };
    const mediaElement = (
      <div
        className={classnames(classes)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.renderImage()}
        {this.renderControls()}
      </div>
    );

    if (this.props.editable) {
      return this.props.connectDragSource(
        this.props.connectDropTarget(
          mediaElement
        )
      );
    }

    return mediaElement;
  }
}

replaceComponent("MediaItem", CustomMediaItem);

export default CustomMediaItem;
