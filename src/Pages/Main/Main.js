import React, { Component } from "react";
import Nav from "../../Components/Layout/Nav";
import Footer from "../../Components/Layout/Footer";
import MainCategory from "./MainCategory";
import ImgSlider from "./Slider";
import "./Main.scss";
import { API, API_JONG } from "../../global/env";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      scrollY: 0,
      sideFixed: false,
      goTop: false
    };
  }

  componentDidMount = () => {
    this.getApi("recommendation");
    window.addEventListener("scroll", this.onScroll);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  getApi = async url => {
    // const data = await fetch(`${API}/v2/home/${url}`); //API 주소
    const data = await fetch(`${API_JONG}/home`); //API 주소
    const dataJSON = await data.json();
    this.setState({
      data: dataJSON.data["section_list"].filter(item => item !== undefined)
    });
  };

  onScroll = () => {
    const sideScroll = window.scrollY;
    const goTopCheck = window.scrollY;

    this.setState({
      scrollY: sideScroll,
      sideFixed: sideScroll > 470 ? true : false
    });

    this.setState({ goTop: goTopCheck > 1700 ? true : false });
  };

  goTopClick = () => {
    this.setState({ scrollY: 0 });
    window.scrollTo(0, 0);
  };

  mainCateList = () => {
    const { data } = this.state;

    const mainCateList =
      data.length !== 0 &&
      data.map((param, idx) => {
        return (
          <MainCategory
            key={idx}
            section_id={param["section_id"]}
            section_type={param["section_type"]}
            title={param["title"]}
            events={param["events"]}
            products={param["products"]}
            categories={param["categories"]}
            recipes={param["recipes"]}
            reviews={param["reviews"]}
            background={param["background"]}
            text={param["text"]}
          />
        ); // 배열
      });

    return mainCateList;
  };

  render() {
    const { data, sideFixed, scrollY, goTop } = this.state;

    return (
      <div>
        <Nav />
        <ImgSlider src={data[0] && data[0]["banners"]} />
        <div className="main">
          <div
            className={sideFixed ? "quick-menu float" : "quick-menu"}
            style={{
              top: sideFixed ? `${scrollY + 150}px` : "600px"
            }}
          >
            <img
              width="80"
              height="120"
              src="https://res.kurly.com/pc/service/main/1904/bnr_quick_20190403.png"
              alt=""
            />
            <div className="side-menu">
              <span>등급별 혜택</span>
              <span>레시피</span>
              <span>베스트 후기</span>
            </div>
            <div className="side-recent"></div>
          </div>
          {this.mainCateList()}
          <img
            className="img-bottom"
            src="https://img-cf.kurly.com/shop/data/main/15/pc_img_1568875999.png"
            alt=""
          />
          <div
            style={{ bottom: !goTop && "-100px" }}
            onClick={this.goTopClick}
            className="go-top"
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
