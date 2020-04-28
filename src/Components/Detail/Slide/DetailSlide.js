import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class DetailSlide extends Component {
  render() {
    const { name, price, img, no } = this.props; //destructuring
    return (
      <li
        className="each-slide"
        onClick={
          () => this.props.history.push(`/detail/${no}`)
          // console.log("no", no);
        }
      >
        <div
          className="relatedImg"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
        <div className="relatedInfo">
          <div className="name">{name}</div>
          <div className="price">{price}</div>
        </div>
      </li>
    );
  }
}

export default withRouter(DetailSlide);
