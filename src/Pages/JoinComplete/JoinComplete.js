import React, { Component } from "react";
import "./JoinComplete.scss";

class JoinComplete extends Component {
  render() {
    return (
      <div className="JoinComplete">
        <div className="outer">
          <div className="member-join-complete">
            <div className="complete-contents">
              <div className="roof">
                <p className="notification">회원가입이 완료되었습니다.</p>
              </div>
              <div>
                <div className="info-line">
                  <div className="col1">아이디</div>
                  <div className="col2">sangjin42</div>
                </div>
                <div className="info-line">
                  <div className="col1">이름</div>
                  <div className="col2">안상진</div>
                </div>
                <div className="info-line">
                  <div className="col1">이메일</div>
                  <div className="col2">sangjin42@naver.com</div>
                </div>
                <div className="bottom-button-box">
                  <button className="left-button">
                    <a href="google.com">신규 혜택 100원 상품 보러가기</a>
                  </button>
                  <button className="right-button">
                    <a href="google.com">마이페이지로 이동</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JoinComplete;
