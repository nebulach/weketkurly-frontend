import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Nav.scss";
import "../../Styles/reset.scss";
import { API, API_JONG } from "../../global/env";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleCategory0: false,
      visibleCategory1: false,
      visibleProfile1: false,
      visibleProfile2: false,
      visibleCartPopup: false,
      sideFloat: false,
      headerFixed: false,
      scrollY: 0,
      inputSearchValue: "서울 맛집 로드 week.2",
      data: [],
      dataDepth2: [[], []],
      dataProfileList1: [
        "주문 내역",
        "늘 사는 것",
        "상품 후기",
        "적립금",
        "쿠폰",
        "개인 정보 수정",
        "로그아웃"
      ],
      dataProfileList2: [
        "공지사항",
        "자주하는 질문",
        "1:1 문의",
        "대량주문 문의",
        "상품 제안",
        "에코포장 피드백"
      ],
      itemCartCount: 0,
      isSameCartCount: 2,
      isSameProps: "",
      myInfo: {}
    };
  }

  componentDidMount() {
    this.getApi("products/category");
    this.getMyInfo();
    sessionStorage.getItem("wetoken") && this.getCart();
    window.addEventListener("scroll", this.onScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.myInfo.name === undefined &&
      sessionStorage.getItem("wetoken") &&
      this.getMyInfo();
    this.state.itemCartCount !== prevState.itemCartCount && this.getCart();
    this.props.productName !== "" &&
      this.props.productName !== undefined &&
      this.isSameCount();
    // console.log(prevState.isSameProps, this.state.isSameProps);
    // if (prevState.isSameProps !== this.state.isSameProps) {
    //   this.props.productName === "조각무 2조각" && this.isSameCount();
    // }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this._headerScroll);
  }

  getMyInfo = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", sessionStorage.getItem("wetoken"));
    myHeaders.append("Content-Type", "application/json");

    const user = await fetch(`${API_JONG}/users/mypage`, {
      method: "GET",
      headers: myHeaders
    });
    const userJSON = await user.json();

    this.setState({ myInfo: userJSON });
  };

  getApi = async url => {
    const data = await fetch(`${API_JONG}/${url}`); //API 주소
    const dataJSON = await data.json();

    this.setState({
      data: dataJSON.data
    });
  };

  getCart = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", sessionStorage.getItem("wetoken"));
    myHeaders.append("Content-Type", "application/json");

    const data = await fetch(`${API_JONG}/orders/cart`, {
      method: "GET",
      headers: myHeaders
    });
    const dataJSON = await data.json();

    this.setState({ itemCartCount: dataJSON.data.length });
  };

  movePath = menu => {
    // console.log(e.target);
    // if (menu === "기본 채소") {
    this.props.history.push("/categoryview" + menu);
    // }
  };

  inputChange = e => {
    if (e.keyCode === 13) {
      this.props.history.push(`/search?keyword=${e.target.value}&viewPage=1`);
    } else {
      this.setState({
        inputSearchValue: e.target.value
      });
    }
  };

  isSameCount = () => {
    if (this.props.productName !== this.state.isSameProps) {
      console.log("애니메이션 실행");
      this.getCart();
      this.setState({
        visibleCartPopup: !this.state.visibleCartPopup,
        isSameProps: this.props.productName
      });
      setTimeout(() => {
        this.setState({ visibleCartPopup: !this.state.visibleCartPopup });
      }, 3000);
    }
  };

  visible = (name, idx) => {
    const {
      visibleProfile1,
      visibleProfile2,
      visibleCategory0,
      visibleCategory1
    } = this.state;

    if (sessionStorage.getItem("wetoken") !== null && name === "prof") {
      switch (idx) {
        case 1:
          this.setState({
            visibleProfile1: !visibleProfile1
          });
          break;
        case 2:
          this.setState({
            visibleProfile2: !visibleProfile2
          });
          break;
        default:
          console.log("visible error");
      }
    } else if (name === "cate") {
      switch (idx) {
        case 0:
          this.setState({
            visibleCategory0: !visibleCategory0
          });
          break;
        case 1:
          this.setState({
            visibleCategory1: !visibleCategory1
          });
          break;
        default:
          break;
      }
    }
  };

  liProfileListdown = paramArr => {
    const liProfileListdown = paramArr.map((param, idx) => {
      return param === "주문 내역" ? (
        <li key={idx}>
          <p style={{ cursor: "pointer" }} onClick={this.goToOrderlist}>
            {param}
          </p>
        </li>
      ) : param === "로그아웃" ? (
        <li
          key={idx}
          onClick={() => {
            sessionStorage.clear();
            this.props.history.push("/");
            this.setState({ visibleProfile1: false, visibleProfile2: false });
          }}
        >
          <p>{param}</p>
        </li>
      ) : (
        <li key={idx}>
          <p>{param}</p>
        </li>
      );
    });
    return liProfileListdown;
  };

  liCategoryListdown = paramArr => {
    let liCateListdown = [];

    liCateListdown =
      paramArr &&
      paramArr.map((param, idx) => {
        return (
          <li
            key={idx}
            onMouseEnter={() => {
              this.visible("cate", 2);
              this.setState({ dataDepth2: [param[1], param[2]] }); // param을 idx 인덱스의 [1]의 ["name"]을 맵 돌려서 보여주세요
            }}
            onMouseLeave={() => {
              this.visible("cate", 2);
              this.setState({ dataDepth2: [param[1], param[2]] });
            }}
          >
            <div>
              <img src={this.state.data[idx].icon_black_url} alt="" />
              <span>{param[0]}</span>
            </div>
          </li>
        );
      });
    return liCateListdown;
  };

  onScroll = () => {
    const headScroll = window.scrollY;
    const sideScroll = window.scrollY;

    this.setState({
      scrollY: headScroll,
      headerFixed: headScroll > 116 ? true : false
    });

    this.setState({ sideFixed: sideScroll > 470 ? true : false });
  };

  goToCart = () => {
    this.props.history.push("/itemcart");
  };

  goToMain = () => {
    this.props.history.push("/");
  };

  goToOrderlist = () => {
    this.props.history.push("/orderlist");
  };

  render() {
    const { popPrice, url, productName } = this.props;

    const {
      visibleCategory0,
      visibleCategory1,
      visibleProfile1,
      visibleProfile2,
      headerFixed,
      data,
      dataDepth2,
      dataProfileList1,
      dataProfileList2,
      inputSearchValue,
      itemCartCount
    } = this.state;

    return (
      <div className="header">
        <div className="nav-top">
          {/* <button
            style={{ position: "absolute", left: "100px" }}
            onClick={() => {
              this.setState(
                { itemCartCount: itemCartCount + 1 },
                this.isSameCount
              );
            }}
          >
            장바구니
          </button> */}
          {/* 최상단 */}
          {/* {console.log(productName)} */}
          <img
            alt="좌상단 배너"
            src="https://res.kurly.com/pc/service/common/1908/delivery_190819.gif"
          />
          <div>
            <ul>
              <li
                className="profile-listdown"
                onMouseEnter={() => this.visible("prof", 1)}
                onMouseLeave={() => this.visible("prof", 1)}
              >
                {sessionStorage.getItem("wetoken") !== null ? (
                  <>
                    <span id="prof-grade">
                      {`${this.state.myInfo && this.state.myInfo.grade}`}
                    </span>
                    <span style={{ color: "#5f0080" }}>
                      {`${this.state.myInfo && this.state.myInfo.name}님`}
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      onClick={() => {
                        this.props.history.push("/join");
                      }}
                      style={{ color: "#5f0080" }}
                    >
                      회원가입
                    </span>
                    <span
                      onClick={() => {
                        this.props.history.push("/login");
                      }}
                    >
                      로그인
                    </span>
                  </>
                )}

                <ul
                  className="nav-prof-list"
                  style={{
                    display: visibleProfile1 ? "block" : "none"
                  }}
                >
                  {this.liProfileListdown(dataProfileList1)}
                </ul>
              </li>
              <li
                className="profile-listdown"
                onMouseEnter={() => this.visible("prof", 2)}
                onMouseLeave={() => this.visible("prof", 2)}
              >
                <span>고객센터</span>
                <ul
                  className="nav-prof-list"
                  style={{
                    display: visibleProfile2 ? "block" : "none"
                  }}
                >
                  {this.liProfileListdown(dataProfileList2)}
                </ul>
              </li>
              <li>
                <span>배송지역 검색</span>
              </li>
            </ul>
          </div>
        </div>
        <div onClick={this.goToMain} className="nav-logo">
          {/* 로고 */}
          <img
            alt="로고"
            src="https://res.kurly.com/images/marketkurly/logo/logo_x2.png"
          />
        </div>
        <div className={headerFixed ? "nav-bottom fixed" : "nav-bottom"}>
          {/* 카테고리 & 검색 & 장바구니 */}
          <ul className="nav-bottom-bar">
            <li
              className="category-listdown"
              onMouseEnter={() => this.visible("cate", 0)}
              onMouseLeave={() => this.visible("cate", 0)}
            >
              <img
                alt="카테고리"
                src="https://res.kurly.com/pc/service/common/1908/ico_gnb_all_off.png"
              />
              <span>전체 카테고리</span>

              <div
                className="category-listdown-depth0"
                onMouseEnter={() => this.visible("cate", 1)}
                onMouseLeave={() => this.visible("cate", 1)}
                style={{
                  display: visibleCategory0 ? "block" : "none",
                  width: visibleCategory1 ? "438px" : null
                }}
              >
                <div style={{ width: visibleCategory1 ? "438px" : null }}>
                  <ul className="category-listdown-depth1">
                    {data.length !== 0 &&
                      this.liCategoryListdown(
                        data.map((param, _) => {
                          return [
                            param["main_category"],
                            param["subcategory"],
                            param["main_id"]
                          ];
                        })
                      )}
                  </ul>
                  <ul
                    style={{ display: visibleCategory1 && "flex" }}
                    className="category-listdown-depth2"
                  >
                    {dataDepth2[0].map((param, idx) => (
                      <li
                        onClick={() => {
                          this.movePath(`/${dataDepth2[1]}/${param.id}`);
                        }}
                        key={idx}
                      >
                        <span>{param.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
            <li
              className="nav-bottom-bar-item"
              onClick={() => this.props.history.push("/newproducts")}
            >
              <span>신상품</span>
            </li>
            <li
              className="nav-bottom-bar-item"
              onClick={() => this.props.history.push("/best")}
            >
              <span>베스트</span>
            </li>
            <li
              className="nav-bottom-bar-item"
              onClick={() => this.props.history.push("/sale")}
            >
              <span>알뜰쇼핑</span>
            </li>
            <li className="nav-bottom-bar-item">
              <span onClick={() => this.props.history.push("/eventmain")}>
                이벤트
              </span>
            </li>
            <div className="search-wrap">
              <input
                onChange={this.inputChange}
                onKeyUp={this.inputChange}
                type="text"
                value={inputSearchValue}
                required="required"
                className="input-search"
              />
              <img
                alt="검색 돋보기"
                src="https://res.kurly.com/pc/service/common/1908/ico_search_x2.png"
              />
            </div>
            <div onClick={this.goToCart} className="itemcart">
              <img
                alt="장바구니"
                src="https://res.kurly.com/pc/ico/1908/ico_cart_x2_v2.png"
              />
              <input
                type="text"
                value={typeof itemCartCount === "number" ? itemCartCount : 0}
                className="itemcart-count"
                style={{ display: "block" }}
              />
              <div
                style={{
                  opacity: this.state.visibleCartPopup ? "1" : "0",
                  display: this.state.visibleCartPopup ? "flex" : "none"
                }}
                className="itemcart-popup"
              >
                <img src={url} alt="" />
                <div>
                  <p>{productName}</p>
                  <p>장바구니에 담겼습니다.</p>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(Nav);
