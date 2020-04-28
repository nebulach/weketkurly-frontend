import React, { Component } from "react";
import "./PaymentBar.scss";

export default class PaymentBar extends Component {
  render() {
    const { price } = this.props;
    return (
      <div className="payment-price-wrap">
        <div className="payment-price" style={{ top: `${this.props.top}px` }}>
          <h2>결제 금액</h2>
          <table>
            <tbody>
              <tr>
                <th className="top-th">상품금액</th>
                <td className="top-td">{price[0]}원</td>
              </tr>
              <tr>
                <th className="line" />
                <td className="line" />
              </tr>
              <tr>
                <th>상품할인금액</th>
                <td>{price[1]}원</td>
              </tr>
              <tr>
                <th>배송비</th>
                <td>3,000원</td>
              </tr>
              <tr>
                <th>쿠폰사용</th>
                <td>0원</td>
              </tr>
              <tr>
                <th className="use">적립금사용</th>
                <td className="point">0원</td>
              </tr>
              <tr>
                <th className="total-th">최종결제금액</th>
                <td className="total-td">{price[3]}원</td>
              </tr>
              <tr>
                <td className="samll-td" colSpan="2">
                  구매 시 <b>100</b>원(0.5%) <b>적립예정</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
