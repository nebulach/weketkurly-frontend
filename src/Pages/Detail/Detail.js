import React, { Component } from "react";
import Nav from "../../Components/Layout/Nav";
import ProductInfo from "../../Components/Detail/ProductInfo";
import DetailSlide from "../../Components/Detail/DetailSlide";
import TotalPrice from "../../Components/Detail/TotalPrice";
import Count from "../../Components/Detail/Count";
import CartBtn from "../../Components/Detail/CartBtn";
import RelatedProductSlide from "../../Components/RelatedProductSlide";
import Review from "../../Components/Detail/Review";
import Qa from "../../Components/Detail/Qa";
import PopUp from "../../Components/Popup/PopUp";
import Footer from "../../Components/Layout/Footer";
import "./Detail.scss";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      price: 37000,
      point: 185,
      save: false,
      popUp: false,
      popUpCart: false,
      scroll: false,
      scrollTop: 0,
      display: false,
      more: false,
      moreBtn: true,
      closeBtn: false,
      translate: 0,
      data: [],
      info: []
    };
  }

  componentDidMount = () => {
    window.addEventListener("scroll", this.onScroll);

    fetch("http://localhost:3000/data/data.json")
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.data
        });
      });

    fetch("https://api.kurly.com/v3/home/products/27422?&ver=1582712067853")
      .then(res => res.json())
      .then(res => {
        this.setState({
          info: res.data
        });
      });
  };

  onScroll = e => {
    // 스크롤 할때마다 state에 scroll한 만큼 scrollTop 값 증가하므로 이를 업데이트해줌,
    //따라서 스크롤 시점에 따라 특정액션을 추후에 state를 활용하여 구현 가능
    const scrollTop = ("scroll", e.srcElement.scrollingElement.scrollTop);
    if (scrollTop > 1270) {
      this.setState({
        scroll: true,
        scrollTop: scrollTop
      });
    } else {
      this.setState({
        scroll: false
      });
    }
  };

  numberWithCommas = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  handleOnClickPlus = () => {
    this.setState({
      number: this.state.number + 1,
      price: this.state.price + 37000,
      point: this.state.point + 185
    });
  };

  handleOnClickMinus = () => {
    if (this.state.number <= 1) {
      this.setState({
        number: this.state.number,
        price: this.state.price,
        point: this.state.point
      });
    } else {
      this.setState({
        number: this.state.number - 1,
        price: this.state.price - 37000,
        point: this.state.point - 185
      });
    }
  };

  handleOnClickSave = () => {
    this.setState({
      save: true,
      popUp: !this.state.popUp
    });
  };

  togglePopUp = () => {
    this.setState({
      popUp: !this.state.popUp
    });
  };

  togglePopUpCart = () => {
    this.setState({
      popUpCart: !this.state.popUpCart
    });
  };

  handleOnClickNext = e => {
    this.setState({
      translate: this.state.translate === -1920 ? 0 : this.state.translate - 960
    });
  };

  handleOnClickBefore = e => {
    this.setState({
      translate: this.state.translate === 0 ? -1920 : this.state.translate + 960
    });
  };

  MoveToProduct = () => {
    window.scrollTo(0, 1250, "smooth");
  };

  MoveToImg = () => {
    window.scrollTo(0, 3650, "smooth");
  };

  MoveToInfo = () => {
    window.scrollTo(0, 6300, "smooth");
  };

  MoveToReview = () => {
    window.scrollTo(0, 8050, "smooth");
  };

  MoveToQA = () => {
    window.scrollTo(0, 9100, "smooth");
  };

  onClickBarOpen = () => {
    this.setState({
      display: true
    });
  };

  onClickBarClose = () => {
    this.setState({
      display: false
    });
  };

  onClickMoreOpen = () => {
    this.setState({
      more: true,
      moreBtn: false,
      closeBtn: true
    });
  };

  onClickMoreClose = () => {
    this.setState({
      more: false,
      moreBtn: true,
      closeBtn: false
    });
  };

  render() {
    const {
      number,
      price,
      point,
      save,
      popUp,
      popUpCart,
      scroll,
      display,
      more,
      moreBtn,
      closeBtn,
      translate,
      info,
      data
    } = this.state;

    // 상품 이미지
    const mainImg = info.original_image_url;

    // 슬라이드 기능 구현
    const x = translate;
    const next = {
      transform: `translateX(${x}px)`
    };

    const dataImg =
      data.length === 0
        ? null
        : this.state.data.map(el => {
            return (
              <DetailSlide
                key={el.id}
                img={el.img}
                name={el.name}
                price={el.price}
              />
            );
          });

    return (
      <div className="Detail">
        <Nav />
        <div className="product-top">
          <div
            className="product-img"
            style={{ backgroundImage: `url(${mainImg})` }}
          />

          {/* 상품 구매 정보 */}
          <ProductInfo
            name={info.name}
            short_description={info.short_description}
            origin={info.origin}
            price={this.numberWithCommas(price)}
            point={point}
            unit_text={info.unit_text}
            weight={info.weight}
            delivery_time_type_text={info.delivery_time_type_text}
            number={number}
            contactant={info.contactant}
            handleOnClickPlus={this.handleOnClickPlus}
            handleOnClickMinus={this.handleOnClickMinus}
          />
        </div>

        {/* 가격정보 */}
        <div className="total-price-cart">
          <TotalPrice price={this.numberWithCommas(price)} point={point} />
          <CartBtn
            handleOnClickSave={this.handleOnClickSave}
            togglePopUp={this.togglePopUp}
            togglePopUpCart={this.togglePopUpCart}
            save={save}
          />
          {popUp ? (
            <PopUp
              close={this.togglePopUp}
              txt="늘 사는 리스트에 추가했습니다."
            />
          ) : null}
          {popUpCart ? (
            <PopUp
              close={this.togglePopUpCart}
              txt="이미 동일한 상품이 장바구니에 존재합니다."
            />
          ) : null}
        </div>

        <RelatedProductSlide
          next={next}
          dataImg={dataImg}
          handleOnClickBefore={this.handleOnClickBefore}
          handleOnClickNext={this.handleOnClickNext}
        />

        {/* tab */}
        <div className="tab">
          <ul>
            <li className="tabOn" onClick={this.MoveToProduct}>
              상품설명
            </li>
            <li className="tabOff" onClick={this.MoveToImg}>
              상품이미지
            </li>
            <li className="tabOff" onClick={this.MoveToInfo}>
              상세정보
            </li>
            <li className="tabOff" onClick={this.MoveToReview}>
              고객후기({info.review_count})
            </li>
            <li className="tabLast" onClick={this.MoveToQA}>
              상품문의(2)
            </li>
            <div className="line" />
          </ul>
        </div>

        {/* detail */}
        <div className="detail">
          <img
            className="detail-main-img"
            alt="메인 이미지"
            src="//img-cf.kurly.com/shop/data/goodsview/20180802/gv10000028525_1.jpg"
          />
          <h3>달콤한 대추 속에 숨은 고소한 브라질너트</h3>
          <h1>
            [선물세트]
            <br />
            유기샘 브라질너트 바삭대추
          </h1>
          <div className="line" />
          <p>
            매일 꼬박꼬박 챙겨먹을 수 있는 견과 제품은 많지만, 소중한 분께
            챙겨드릴 수 있는 제품은 의외로 많지 않아요. 정성들여 만든 모양과
            고급스러운 맛이 돋보이는 선물세트를 컬리가 준비했어요. 커다란
            땅콩처럼 생긴 브라질너트는 약간 무른 듯 부드러운 식감을 가진
            견과류에요. 단 2알 만으로도 풍부한 셀레늄을 섭취할 수 있는
            브라질너트와 비타민 B군, 사포닌, 식이섬유가 풍부한 대추가 만나
            달달고소한 영양간식이 되었답니다. <br />
            <br />
            오랜 기간 친환경 견과류를 고집해온 유기샘은 체계적이면서도 위생적인
            제조 공정을 거치는 것으로 잘 알려져 있어요. 상품의 원재료도 생산자와
            직접 계약하여 꼼꼼히 품질을 확인한 뒤 수급하지요. 어린이부터 할머니,
            할아버지까지 건강하게 먹을 수 있도록 식품첨가물은 단 한 가지도 넣지
            않아 더 믿고 먹을 수 있답니다.
          </p>

          {/* <div className = "kurly-check-point">
                        <div className = "line-left" />
                        <h3>Kurly's Check Point</h3>
                        <div className = "line-right" />
                    </div> */}

          {/* <div className = "check-point-img" >
                        <img src = "https://img-cf.kurly.com/shop/data/goodsview/20190730/gv10000057639_1.jpg" alt = "Kurly's Check Point" />
                    </div> */}

          <div className="kurly-pick">
            <div className="line-left" />
            <h3>Kurly's Pick</h3>
            <div className="line-right" />
          </div>

          {/* <div className = "pick-img">
                        <img src = "https://img-cf.kurly.com/shop/data/goodsview/20190730/gv40000057640_1.jpg" alt = "Kurly's Pick" />
                    </div> */}

          <div className="txt">
            <div className="txtTitle">유기샘 브라질너트 바삭대추</div>
            <div className="txtContents">
              <b>・ 구성</b>
              <span> : 1박스(100g X 3개입)</span>
              <br />
              <b>・ 특징</b>
              <span>
                : 커다란 땅콩처럼 생긴 브라질너트를 PET 용기에 담아 보관이
                편리해요.
              </span>
              <br />
              <b>・ 테이스팅 노트</b>
              <span>
                : 건대추로 브라질너트를 감싼 뒤 작게 잘라 한 입에 먹기 좋아요.
                바삭하면서도 오독오독한 식감과 함께 달콤하고 고소한 맛이에요.
              </span>
              <br />
            </div>
          </div>

          <div className="kurly-tip">
            <h3>Kurly's Tip</h3>
            <div className="contents">
              <div className="check">구입 전 확인하세요</div>
              <div className="content">
                ・ 선물세트를 넣을 수 있는 전용 쇼핑백을 함께 보내드립니다.
              </div>
            </div>
          </div>
        </div>

        <div className="tab">
          <ul>
            <li className="tabOff" onClick={this.MoveToProduct}>
              상품설명
            </li>
            <li className="tabOn" onClick={this.MoveToImg}>
              상품이미지
            </li>
            <li className="tabOff" onClick={this.MoveToInfo}>
              상세정보
            </li>
            <li className="tabOff" onClick={this.MoveToReview}>
              고객후기({info.review_count})
            </li>
            <li className="tabLast" onClick={this.MoveToQA}>
              상품문의(2)
            </li>
            <div className="line" />
          </ul>
        </div>

        <img
          className="detail-info"
          src="https://img-cf.kurly.com/shop/data/goodsview/20190730/gv30000057970_1.jpg"
          alt="detail-info"
        />

        {/* tab */}
        <div className="tab">
          <ul>
            <li className="tabOff" onClick={this.MoveToProduct}>
              상품설명
            </li>
            <li className="tabOff" onClick={this.MoveToImg}>
              상품이미지
            </li>
            <li className="tabOn" onClick={this.MoveToInfo}>
              상세정보
            </li>
            <li className="tabOff" onClick={this.MoveToReview}>
              고객후기({info.review_count})
            </li>
            <li className="tabLast" onClick={this.MoveToQA}>
              상품문의(2)
            </li>
            <div className="line" />
          </ul>
        </div>

        <div className="why-kurly">
          <table>
            <tbody>
              <tr>
                <th>포장단위별 용량(중량), 수량, 크기</th>
                <td>상품설명 및 상품이미지 참조</td>
                <th>관련법상 표시사항</th>
                <td>
                  농산물 - 농수산물품질관리법상 유전자변형농산물 표시, 지리적
                  표시 <br />
                  축산물 - 축산법에 따른 등급 표시, 쇠고기의 경우 이력관리에
                  따른 표시 유무 <br />
                  수산물 - 농수산물품질관리법상 유전자변형수산물 표시, 지리적
                  표시 <br />
                  수입식품에 해당하는 경우 “식품위생법에 따른 수입신고를 필함”의
                  문구 <br />
                </td>
              </tr>
              <tr>
                <th>생산자, 수입품의 경우 수입자를 함께 표기</th>
                <td>농업회사법인 유기샘 주식회사</td>
                <th>상품구성</th>
                <td>상품설명 및 상품이미지 참조</td>
              </tr>
              <tr>
                <th>농수산물의 원산지 표시에 관한 법률에 따른 원산지</th>
                <td>브라질 너트 - 페루산 / 대추 - 국내산</td>
                <th>보관방법 또는 취급방법</th>
                <td>상온 보관</td>
              </tr>
              <tr>
                <th>
                  제조연월일(포장일 또는 생산연도), 유통기한 또는 품질유지기한
                </th>
                <td>제품 별도 라벨 표기 참조</td>
                <th>소비자상담 관련 전화번호</th>
                <td>마켓컬리 고객행복센터(1644-1107)</td>
              </tr>
            </tbody>
          </table>
          <h3>WHY KURLY</h3>
          <div className="why">
            <div className="why-kurly-contents">
              <div className="why-kurly-info">
                <img
                  src="https://res.kurly.com/pc/ico/1910/01_check.svg"
                  alt=""
                />
                <div className="title">깐깐한 상품위원회</div>
              </div>
              <div className="content">
                나와 내 가족이 먹고 쓸 상품을 고르는
                <br />
                마음으로 매주 상품을 직접 먹어보고, <br />
                경험해보고 성분, 맛, 안정성 등 다각도의
                <br />
                기준을 통과한 상품만을 판매합니다.
                <br />
              </div>
            </div>

            <div className="why-kurly-contents">
              <div className="why-kurly-info">
                <img
                  src="https://res.kurly.com/pc/ico/1910/01_check.svg"
                  alt=""
                />
                <div className="title">차별화된 Kurly Only 상품</div>
              </div>
              <div className="content">
                전국 각지와 해외의 훌륭한 생산자가
                <br />
                믿고 선택하는 파트너, 마켓컬리.
                <br />
                2천여 개가 넘는 컬리 단독 브랜드, 스펙의
                <br />
                Kurly Only 상품을 믿고 만나보세요.
                <br />
              </div>
            </div>

            <div className="why-kurly-contents">
              <div className="why-kurly-info">
                <img
                  src="https://res.kurly.com/pc/ico/1910/01_check.svg"
                  alt=""
                />
                <div className="title">신선한 풀콜드체인 배송</div>
              </div>
              <div className="content">
                온라인 업계 최초로 산지에서 문 앞까지
                <br />
                상온, 냉장, 냉동 상품을 분리 포장 후<br />
                최적의 온도를 유지하는 냉장 배송 시스템,
                <br />
                풀콜드체인으로 상품을 신선하게 전해드립니다.
                <br />
              </div>
            </div>
          </div>
        </div>

        <div className="full-line" />

        <div className="customer-center">
          <div className="customer-center-title">
            <h3>고객행복센터</h3>
            <div className="service">
              궁금하신 점이나 서비스 이용에 불편한 점이 있으신가요?
            </div>
            <div className="help">
              문제가 되는 부분을 사진으로 찍어 아래 중 편하신 방법으로 접수해
              주시면 빠르게 도와드리겠습니다.
            </div>
          </div>
          <div className="contents">
            <div className="call">
              <div className="mark-title">
                <div className="mark" />
                <div className="mark-name">전화 문의 1644-1107</div>
              </div>
              <div className="mark-time">오전 7시~오후 7시 (연중무휴)</div>
            </div>

            <div className="kakao">
              <div className="mark-title">
                <div className="mark" />
                <div className="mark-name"> 카카오톡 문의</div>
              </div>
              <div className="mark-time">오전 7시~오후 7시 (연중무휴)</div>
              <div className="mark-contents">
                카카오톡에서 '마켓컬리'를 검색 후<br />
                대화창에 문의 및 불편사항을
                <br />
                남겨주세요.
              </div>
            </div>

            <div className="homepage">
              <div className="mark-title">
                <div className="mark" />
                <div className="mark-name"> 홈페이지 문의</div>
              </div>
              <div className="mark-time">
                24시간 접수 가능
                <br />
                로그인 > 마이컬리 > 1:1 문의
              </div>
              <div className="mark-contents">
                고객센터 운영 시간에 순차적으로
                <br />
                답변해드리겠습니다.
                <br />
              </div>
            </div>
          </div>
        </div>

        <div className="refund">
          <div className="refund-left">
            <div className="refund-notice">교환 및 환불 안내</div>
            <div className="txt">
              고객님의 단순 변심으로 인한 반품은 어려울 수 있으니 양해
              부탁드립니다.
            </div>
          </div>
          <div
            className="more-btn"
            onClick={this.onClickMoreOpen}
            style={{ display: moreBtn ? "block" : "none" }}
          >
            <span>자세히 보기</span>
            <img
              alt="arrow"
              src="https://res.kurly.com/pc/ico/2001/pc_arrow_open@2x.png"
            />
          </div>
          <div
            className="close-btn"
            onClick={this.onClickMoreClose}
            style={{ display: closeBtn ? "block" : "none" }}
          >
            <span>닫기</span>
            <img
              alt="arrow"
              src="https://res.kurly.com/pc/ico/2001/pc_arrow_close@2x.png"
            />
          </div>
        </div>

        <div className="hide" style={{ display: more ? "block" : "none" }}>
          <div className="refund-info">
            <div className="title">01. 받으신 상품에 문제가 있는 경우</div>
            <div className="contents">
              <div className="hide-contents">
                상품이 표시·광고 내용과 다르거나 부패한 경우 등 상품에 문제가
                있는 정도에 따라 <br />
                재배송, 일부 환불, 전액 환불해드립니다.
              </div>
              <div className="hide-title">신선 / 냉장 / 냉동 식품 </div>
              <div className="hide-contents">
                상품을 받은 날부터 2일 이내에 상품 상태를 확인할 수 있는 사진을
                첨부해 1:1 문의 게시판에 남겨주세요. <br />
              </div>
              <div className="hide-title">
                유통기한 30일 이상의 식품 (신선 / 냉장 / 냉동 제외) 및 기타 상품
              </div>
              <div className="hide-contents">
                상품을 받은 날부터 3개월 이내 또는 문제가 있다는 사실을 알았거나
                알 수 있었던 날부터 30일 이내에 <br />
                상품의 상태를 확인할 수 있는 사진을 첨부해 1: 1 문의 게시판에
                남겨주세요.
              </div>
              <div className="hide-extra">
                ※상품에 문제가 있는 것으로 확인되면 배송비는 컬리가 부담합니다.
              </div>
            </div>
          </div>
          <div className="refund-info">
            <div className="title">02. 단순 변심, 주문 착오의 경우</div>
            <div className="contents">
              <div className="hide-title">신선 / 냉장 / 냉동 식품 </div>
              <div className="hide-contents">
                재판매가 불가한 상품의 특성상, 단순 변심, 주문 착오 시 교환 및
                반품이 어려운 점 양해 부탁드립니다. <br />
                상품에 따라 조금씩 맛이 다를 수 있으며, 개인의 기호에 따라 같은
                상품도 다르게 느끼실 수 있습니다.
              </div>
              <div className="hide-title">
                유통기한 30일 이상의 식품 (신선 / 냉장 / 냉동 제외) 및 기타 상품
              </div>
              <div className="hide-contents">
                상품을 받은 날부터 7일 이내에 1:1 문의 게시판에 남겨주세요.
              </div>
              <div className="hide-extra">
                ※ 단순 변심으로 인한 교환 또는 환불의 경우 고객님께서 배송비
                6,000원을 부담하셔야 합니다. <br />
                (주문 건 배송비를 결제하셨을 경우 3,000원)
              </div>
            </div>
          </div>
          <div className="refund-info">
            <div className="title">03. 교환·반품이 불가한 경우</div>
            <div className="contents">
              <div className="hide-extra">
                다음에 해당하는 교환·반품 신청은 처리가 어려울 수 있으니 양해
                부탁드립니다. <br />
                <br />- 소비자에게 책임 있는 사유로 상품이 멸실 또는 훼손된 경우{" "}
                <br />
                (포장지 훼손으로 인해 재판매가 불가능한 상품의 경우, 단순 변심에
                의한 반품이 어렵습니다.) <br />- 일부 예약 상품은 배송 3~4일
                전에만 취소하실 수 있습니다.
                <br /> 소비자의 주문에 따라 개별적으로 생산되는 상품이 이미 제작
                진행된 경우
              </div>
            </div>
          </div>
          <div className="line" />
        </div>

        <div className="tab">
          <ul>
            <li className="tabOff" onClick={this.MoveToProduct}>
              상품설명
            </li>
            <li className="tabOff" onClick={this.MoveToImg}>
              상품이미지
            </li>
            <li className="tabOff" onClick={this.MoveToInfo}>
              상세정보
            </li>
            <li className="tabOn" onClick={this.MoveToReview}>
              고객후기({info.review_count})
            </li>
            <li className="tabLast" onClick={this.MoveToQA}>
              상품문의(2)
            </li>
            <div className="line" />
          </ul>
        </div>
        <Review />
        <div className="tab">
          <ul>
            <li className="tabOff" onClick={this.MoveToProduct}>
              상품설명
            </li>
            <li className="tabOff" onClick={this.MoveToImg}>
              상품이미지
            </li>
            <li className="tabOff" onClick={this.MoveToInfo}>
              상세정보
            </li>
            <li className="tabOff" onClick={this.MoveToReview}>
              고객후기({info.review_count})
            </li>
            <li
              className="tabOn"
              onClick={this.MoveToQA}
              style={{ borderRightColor: "#bfbfbf" }}
            >
              상품문의(2)
            </li>
            <div className="line" />
          </ul>
        </div>

        <Qa />
        <div className="bar" style={{ display: scroll ? "block" : "none" }}>
          <div className="bar-open">
            <div className="btn-open" onClick={this.onClickBarOpen}>
              상품 선택
            </div>
          </div>
          <div
            className="bar-close"
            style={{ display: display ? "block" : "none" }}
          >
            <div className="btn-close" onClick={this.onClickBarClose}>
              상품 선택
            </div>
            <div className="bar-info">
              <ul>
                <li>
                  <span className="title">{info.name}</span>
                  <span className="count">
                    <Count
                      number={number}
                      handleOnClickPlus={this.handleOnClickPlus}
                      handleOnClickMinus={this.handleOnClickMinus}
                    />
                  </span>
                  <span className="price">
                    {this.numberWithCommas(price)}원
                  </span>
                </li>
              </ul>
              <div className="total-price-point">
                <TotalPrice
                  price={this.numberWithCommas(price)}
                  point={point}
                />
              </div>
              <div className="btn">
                <CartBtn
                  handleOnClickSave={this.handleOnClickSave}
                  togglePopUp={this.togglePopUp}
                  togglePopUpCart={this.togglePopUpCart}
                  save={save}
                />
                {popUp ? (
                  <PopUp
                    close={this.togglePopUp}
                    txt="늘 사는 리스트에 추가했습니다."
                  />
                ) : null}
                {popUpCart ? (
                  <PopUp
                    close={this.togglePopUpCart}
                    txt="이미 동일한 상품이 장바구니에 존재합니다."
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
