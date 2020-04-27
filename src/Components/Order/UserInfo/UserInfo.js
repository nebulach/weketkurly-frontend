import React, { Component } from "react";
import "./UserInfo.scss";

export default class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      myInfo: {}
    };
  }

  render() {
    const { myInfo } = this.props;
    return (
      <div className="user-info">
        <h2>주문자 정보</h2>
        <div>
          <table>
            <tbody>
              <tr>
                <th>보내는 분 *</th>
                <td className="name">
                  <input
                    type="text"
                    readOnly="readOnly"
                    value={myInfo.name && myInfo.name}
                  />
                </td>
              </tr>
              <tr>
                <th>휴대폰 *</th>
                <td className="phone">
                  <input
                    type="number"
                    readOnly="readOnly"
                    value={myInfo.name && myInfo.phone.substr(0, 3)}
                    style={{ width: "45px" }}
                  />
                  <span className="bar">
                    <span />
                  </span>
                  <input
                    type="number"
                    readOnly="readOnly"
                    value={myInfo.name && myInfo.phone.substr(3, 4)}
                  />
                  <span className="bar">
                    <span />
                  </span>
                  <input
                    type="number"
                    readOnly="readOnly"
                    value={myInfo.name && myInfo.phone.substr(7, 4)}
                  />
                </td>
              </tr>
              <tr>
                <th>이메일 *</th>
                <td className="email">
                  <input
                    type="text"
                    value={myInfo.name && myInfo.email}
                    readOnly="readOnly"
                  />
                  <p>
                    이메일을 통해 주문처리과정을 보내드립니다.
                    <br />
                    정보 변경은
                    <span className="color"> 마이컬리 > 개인정보 수정 </span>
                    메뉴에서 가능합니다.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
