import React, { Component } from "react";
import "./List.scss";

export default class List extends Component {
  render() {
    const {
      no,
      product_name,
      status,
      thumb,
      price,
      review_button_flag,
      time //2020.02.08(19시 34분)
    } = this.props;

    return (
      <li className="product">
        <div className="date">{time}</div>
        <div className="table">
          <div className="name">{product_name}</div>
          <div className="product-info">
            <div className="info">
              <img src={thumb} alt={product_name} className="thumb" />
              <div>
                <dl>
                  <dt>주문번호</dt>
                  <dd>{no}</dd>
                </dl>
                <dl>
                  <dt>결제금액</dt>
                  <dd>{price.toLocaleString()}원</dd>
                </dl>
                <dl>
                  <dt>주문선택</dt>
                  <dd className="complete">{status}</dd>
                </dl>
              </div>
            </div>
            <div className="button">
              <button
                className={review_button_flag === 1 ? "write" : "write-none"}
              >
                후기쓰기
              </button>
              <button className="question">1:1 문의</button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
