import React from "react";
import { withRouter } from "react-router-dom";
import "./CategoryView";
import "./CategoryView";
import Nav from "../../Components/Layout/Nav";
import Footer from "../../Components/Layout/Footer";
import CategoryViewItem from "./CategoryViewItem";
import CategorySort from "./CategorySort";
import CategoryTitle from "./CategoryTitle";
// import CategoryPage from "./CategoryPage";
import "./CategoryView.scss";
import { API_JONG } from "../../global/env";
import PageBtn from "../../Components/Detail/ReviewQA/PageBtn2";
class NewCategoryView extends React.Component {
  constructor() {
    super();
    this.state = {
      paging: {},
      data: [],
      data2: [],
      cateNum2: "",
      cateNum1: "907",
      nowPath: "",
      rootData: [],
      rootDataAll: {},
      nowPage: 1,
      nowSort: 0

      /* cateNum1 -> CategoryViewItem 화면이 바뀐다  */
      /* cateNum1 -> CategoryTitle, CatergorySort의 주요변수를 바꾸도록한다 */
      /* 채907~베915, 건032, 생918, 주916, 가085, 베919, 반991 */
    };
  }

  componentDidMount() {
    this.getAPI();
  }

  componentDidUpdate(prevProps, prevState) {
    const { nowPage, nowSort } = this.state;
    let diffSort = prevState.nowSort !== nowSort,
      diffPage = prevState.nowPage !== nowPage;

    (diffPage || diffSort) && this.getAPI(nowPage, nowSort);
  }

  getAPI = async (nowPage, nowSort = "0") => {
    const data = await fetch(
      `${API_JONG}/products/newproducts?sort_type=${nowSort}&viewPage=${nowPage}`
    );
    const dataJSON = await data.json();

    this.setState({
      data: dataJSON.data.products,
      paging: dataJSON.paging,
      nowPath: [
        this.props.location.pathname.split("/")[2],
        this.props.location.pathname.split("/")[3]
      ]
    });
  };

  changePageNum = (num, sort) => {
    this.setState({ nowPage: num, nowSort: sort });
  };

  render() {
    return (
      <div className="category-view">
        <Nav />
        <div className="cate-outer">
          <div className="cate-nav">
            <CategoryTitle
              rootDataAll={this.state.rootDataAll}
              rootData={this.state.rootData}
              cateNum1={this.state.cateNum1}
            />
            <CategorySort
              nowPage={this.state.nowPage}
              changePageNum={this.changePageNum}
              bridge1={this.miniNavNum}
              cateNum2={this.state.cateNum1}
              data={this.state.rootData}
              // getSubData={this.getSubData}
            />
          </div>
          <CategoryViewItem
            bridge2={this.state.cateNum}
            bridge3={this.state.data}
          />
          {/* <CategoryPage /> */}
          <PageBtn
            nowPage={this.state.nowPage}
            changePageNum={this.changePageNum}
            nowSort={this.state.nowSort}
            paging={this.state.paging}
          />
          <div style={{ height: "50px" }} />
        </div>
        <Footer />
      </div>
      //구현할 화면 태그 들어갈 자리
      /* Nav-본문2. 부모 태그 본문에 삽입된 컴퍼넌트의 속성 bridge1을 통해, 
      부모에 있던 함수를 실행! */
      /* Nav-본문5. 바뀐 data를 자식 컴퍼넌트에 적용시키기 위해,
      부모 태그 내에 자식컴퍼넌트의 props을 준다. bridge3 
      해당 컴퍼넌트 categoryViewItem에 props을 부여받고 바뀐데이터화면을 뿌린다.
      */
    );
  }
}
export default withRouter(NewCategoryView);
