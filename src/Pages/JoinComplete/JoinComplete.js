import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Nav from "../../Components/Layout/Nav";
import Footer from "../../Components/Layout/Footer";
import "./JoinComplete.scss";

class JoinComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      PW: ""
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  goEvent = () => {
    this.props.history.push("/eventmain");
  };
  goHome = () => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <div>
        <Nav />
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
                    <div className="col2">
                      {this.props.location.state.state.account}
                    </div>
                  </div>
                  <div className="info-line">
                    <div className="col1">이름</div>
                    <div className="col2">
                      {this.props.location.state.state.name}
                    </div>
                  </div>
                  <div className="info-line">
                    <div className="col1">이메일</div>
                    <div className="col2">
                      {this.props.location.state.state.email}
                    </div>
                  </div>
                  <div className="bottom-button-box">
                    <button className="left-button">
                      <div className="benefit" onClick={this.goEvent}>
                        신규 혜택 100원 상품 보러가기
                      </div>
                    </button>
                    <button className="right-button">
                      <div onClick={this.goHome}>로그인 하기</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(JoinComplete);
