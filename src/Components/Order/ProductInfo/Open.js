import React, { Component } from "react";
import "./Open.scss";

export default class Open extends Component {
  render() {
    const arrMap = this.props.listCart.map((el, idx) => {
      return (
        <tr className="each">
          <td className="thumb">
            <img src={el.thumbnail_image_url} alt={el.name} />
          </td>
          <td className="info">
            <div className="name">{el.name}</div>
            <div>{`${
              el.ea
            }개 / 개당 ${el.discounted_price.toLocaleString()}원`}</div>
          </td>
          <td className="price">
            {`${(el.ea * el.discounted_price).toLocaleString()}`}원
          </td>
        </tr>
      );
    });

    return (
      <div className="product-info-open">
        <h2>상품정보</h2>
        <table className="product-info-table">
          <thead>
            <tr>
              <th></th>
              <th className="info">상품정보</th>
              <th>상품금액</th>
            </tr>
          </thead>
          <tbody>{arrMap}</tbody>
        </table>
      </div>
    );
  }
}
