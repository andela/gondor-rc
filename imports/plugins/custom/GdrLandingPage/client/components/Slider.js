import React, { Component } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { Components } from "@reactioncommerce/reaction-components";

class CustomSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoPlay: true,
      autoPlaySpeed: 1000,
      pauseOnHover: true,
      adaptiveHeight: true,
      arrows: true,
      centerMode: true,
      className: "gdr-slick-slider"
    };

    // Get at least ten latest products for new arrivals
    const newArrivals = this.props.products.slice(0, 11);

    return (
      <div className="gdr-slider">
        <h2>New Arrivals</h2>
        <Slider {...settings}>
          {newArrivals.map((product, key) => {
            return (
              <div className="gdr-slider-container" key={key}>
                <Components.DragDropProvider key={key}>
                  <Components.ProductGridItems
                    {...this.props}
                    product={product}
                    key={key}
                    index={key}
                  />
                </Components.DragDropProvider>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}

CustomSlider.propTypes = {
  products: PropTypes.array
};

export default CustomSlider;
