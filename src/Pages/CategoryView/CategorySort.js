import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class CategorySort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cateNum2: this.props.cateNum2,
      options: ["신상품순", "인기상품순", "낮은 가격순", "높은 가격순"],
      childSort: 0
      /* 채907~베915, 건032, 생918, 주916, 가085, 베919, 반991 */
      /* 앞에 세자리번호를 잘라서 cateNum2로 부여 */
    };
  }
  componentDidMount() {
    console.log(this.state.cateNum2);
    // fetch(`https://api.kurly.com/v1/category/${this.state.cateNum2}`)
    //   //미니네브 데이터 받아오는 url
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(res => {
    //     // console.log("res.data 진입하면 ", res.data.root_category.categories);
    //     this.setState({ data: res.data.root_category.categories });
    //   });
  }

  allViewMove = e => {
    console.log("이거", e.target.textContent);
  };

  // sendQueryId = e => {
  //   console.log("e.target.textContent", e.target.textContent);
  //   let queryId = this.state.cateNum;
  //   if (e.traget.textContent === "기본채소") {
  //     queryId = 907001;
  //   }
  //   this.props.history.push(`/categoryview?keyword=${queryId}`);
  //   //www.kurly.com/shop/goods/goods_list.php?category=907001

  //   // this.fetchProduct();
  // };

  // receiveQueryId = () => {
  //   const queryId = this.props.location.search.split("=")[1];
  //   console.log("queryId는", queryId);
  //   fetch(`http://localhost:3000/categoryview?keywords=${queryId}`)
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log("여기가 response, response");
  //       this.setState({ cateNum: queryId });
  //     });
  // };

  setSort = e => {
    const table = {
      신상품순: 0,
      인기상품순: 1,
      "낮은 가격순": 2,
      "높은 가격순": 3
    };
    this.props.changePageNum(this.props.nowPage, table[e.target.value]);
  };

  render() {
    const sortRendering = this.props.data.map(x => {
      return (
        <span className="sort-box">
          <span
            className="sort-box-menu"
            name={x.no}
            style={
              x.id === this.props.nowChecked
                ? { color: "#5f00a1", fontWeight: "600" }
                : null
            }
            onClick={() => {
              this.props.changeNowCheck(x.id);
              this.props.history.push(
                `/categoryview/${this.props.location.pathname.split("/")[2]}/${
                  x.id
                }`
              );
            }}
          >
            {x.name}
          </span>
        </span>
        //하단 개별 미니 네브 메뉴, (전체보기 제외)
        /* Nav-본문1. 네브 메뉴에 온클릭 이벤트를 주어, 
        부모에 삽입된 컴퍼넌트의 프롭스를 받는다. */
      );
    });

    const sortOptionArr = this.state.options.map((el, idx) => {
      return <option key={idx}>{el}</option>;
    });
    console.log(this.props.data);
    console.log(this.props.location.pathname.split("/")[3]);
    return (
      <div className="sort-outer">
        <span className="sort-nav-line">
          <span
            className="all-view"
            name={this.state.cateNum2}
            // onClick={() =>
            //   this.props.history.push(
            //     `/categoryview/${this.props.location.pathname.split("/")[2]}/1`
            //   )
            // }
          >
            전체보기
          </span>
          {/* {this.props.location.pathname.split("/")[1] === "newproducts" ? (
            <span>신상품</span>
          ) : (
            sortRendering
          )} */}
          {sortRendering}
        </span>
        <select onChange={e => this.setSort(e)}>{sortOptionArr}</select>
      </div>
      //하단 미니 네브 전체보기만
    );
  }
}

export default withRouter(CategorySort);
