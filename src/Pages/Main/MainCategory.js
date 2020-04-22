import React, { Component } from "react";
import Recommend from "./CategoryMap/Recommend";
import EventProduct from "./CategoryMap/EventProduct";
import MdProducts from "./CategoryMap/MdProducts";
import RecipeProducts from "./CategoryMap/RecipeProducts";
import InstaPictures from "./CategoryMap/InstaPictures";
import { API, API_JONG } from "../../global/env";

class MainCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mdButtonSelect: 0,
      mdButtonValue: "채소",
      buttonStyle: {
        border: "1px solid #5f0081",
        backgroundColor: "#5f0080",
        color: "#fff"
      },
      data: [],
      moveX: 0
    };
  }

  componentDidMount() {
    // this.getMdApi(907);
    this.getMdApi(1);
  }

  getMdApi = async num => {
    const data = await fetch(
      // `${API}/v2/home/recommendation/md_choice/categories/${num}`
      `${API_JONG}/products/list/total/${num}`
    ); //API 주소
    const dataJSON = await data.json();
    this.setState({
      data: dataJSON.data.products.filter(item => item !== undefined)
    });
  };

  mdClick = e => {
    const param = e.target.id.split(".");
    this.setState(
      {
        mdButtonSelect: Number(param[1]),
        mdButtonValue: e.target.textContent
      },
      () => {
        this.getMdApi(Number(param[0])); // 카테고리 넘버
      }
    );
  };

  moveLeft = () => {
    const { moveX } = this.state;

    if (moveX === -1068) {
      this.setState({ moveX: 0 });
    } else {
      this.setState({
        moveX: moveX - 267
      });
    }
  };

  moveRight = () => {
    const { moveX } = this.state;

    if (moveX === 0) {
      this.setState({ moveX: -1068 });
    } else {
      this.setState(
        {
          moveX: moveX + 267
        },
        console.log(moveX)
      );
    }
  };

  renderProducts = (
    title,
    products,
    events,
    categories,
    data,
    mdButtonSelect,
    mdButtonValue,
    recipes,
    reviews,
    moveX
  ) => {
    const title_table = {
      "이 상품 어때요?": 1,
      "알뜰 상품": 1,
      "오늘의 신상품": 1,
      "지금 가장 핫한 상품": 1,
      "3천원의 행복": 1,
      "이벤트 소식": 2,
      "MD의 추천": 3,
      "컬리의 레시피": 4,
      "인스타그램 고객 후기": 5
    };

    switch (title_table[title]) {
      case 1:
        return <Recommend title={title} products={products} />;
      case 2:
        return <EventProduct title={title} events={events} />;
      case 3:
        return (
          <MdProducts
            title={title}
            categories={categories}
            data={data}
            mdButtonSelect={mdButtonSelect}
            mdButtonValue={mdButtonValue}
            mdClick={this.mdClick}
          />
        );
      case 4:
        return <RecipeProducts title={title} recipes={recipes} />;
      case 5:
        return <InstaPictures title={title} reviews={reviews} moveX={moveX} />;
      default:
        break;
    }
  };

  render() {
    const {
      section_id,
      title,
      events,
      products,
      categories,
      recipes,
      reviews,
      background,
      text,
      moveX
    } = this.props;

    const { data, mdButtonSelect, mdButtonValue } = this.state;

    return (
      <>
        <div className={section_id}>
          {this.renderProducts(
            title,
            products,
            events,
            categories,
            data,
            mdButtonSelect,
            mdButtonValue,
            recipes,
            reviews,
            moveX
          )}

          {section_id === "banner_static_7" && (
            <div
              className="banner"
              style={{ backgroundColor: `${background.color}` }}
            >
              <div>
                <p className="banner-title">{text.title}</p>
                <p className="banner-subtitle">{text.subtitle}</p>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default MainCategory;
