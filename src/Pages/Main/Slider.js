import React, { Component } from "react";
import Slider from "react-slick/lib/slider";
import "./Slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  infinite: true,
  dots: false,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  swipe: false,
  pauseOnHover: true,
  adaptiveHeight: false //흠..
};

class ImgSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  render() {
    const { src } = this.props;

    const imgSliderList =
      src &&
      src.map((param, idx) => {
        return <img src={param["image_url"]} alt="" key={idx} />;
      });

    return (
      <div className="main-slide">
        <button
          onClick={this.previous}
          type="button"
          className="btn-scroll btn-scroll-left"
        />
        <button
          onClick={this.next}
          type="button"
          className="btn-scroll btn-scroll-right"
        />
        <Slider ref={c => (this.slider = c)} {...settings}>
          {imgSliderList}
        </Slider>
      </div>
    );
  }
}

export default ImgSlider;
