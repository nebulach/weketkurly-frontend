import React from "react";
import { withRouter } from "react-router-dom";
import "./CategoryView";
import "./CategoryView";
import Nav from "../../Components/Layout/Nav";
import Footer from "../../Components/Layout/Footer";
import CategoryViewItem from "./CategoryViewItem";
import CategoryTitle from "./CategoryTitle";
import "./CategoryView.scss";
import "./SearchPage.scss";
import { API_JONG } from "../../global/env";
import PageBtn from "../../Components/Detail/ReviewQA/PageBtn2";
class SearchView extends React.Component {
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
      nowPage: 1,
      inputText: new URLSearchParams(window.location.search).get("keyword")

      /* cateNum1 -> CategoryViewItem 화면이 바뀐다  */
      /* cateNum1 -> CategoryTitle, CatergorySort의 주요변수를 바꾸도록한다 */
      /* 채907~베915, 건032, 생918, 주916, 가085, 베919, 반991 */
    };
  }

  componentDidMount() {
    console.log(new URLSearchParams(window.location.search).get("keyword"));
    this.getSearchRes();
  }

  componentDidUpdate(prevProps, prevState) {
    let diffPage = prevState.nowPage !== this.state.nowPage;
    diffPage && this.getSearchRes(this.state.nowPage);
  }

  getSearchRes = async () => {
    const keyword = new URLSearchParams(window.location.search).get("keyword");
    const data = await fetch(
      `${API_JONG}/products/search?keyword=${keyword}&viewPage=${this.state.nowPage}`
    );
    const dataJSON = await data.json();

    console.log(dataJSON);
    this.setState({
      data: dataJSON.data.products,
      paging: dataJSON.paging
    });
  };

  changePageNum = num => {
    this.setState({ nowPage: num });
  };

  inputChange = e => {
    if (e.nativeEvent.type === "click") {
      this.props.history.push(
        `/search?keyword=${this.state.inputText}&viewPage=1`
      );
      this.getSearchRes();
    } else if (e.keyCode === 13) {
      console.log(e.keyCode);
      this.props.history.push(`/search?keyword=${e.target.value}&viewPage=1`);
      this.getSearchRes();
    } else {
      this.setState({
        inputSearchValue: e.target.value
      });
    }
  };

  render() {
    const { data, cateNum, nowPage, paging, inputText } = this.state;
    return (
      <div className="category-view">
        <Nav />
        <div className="cate-outer">
          <div className="search">
            <div className="search-title">
              <p className="search-title-top">상품검색</p>
              <p className="search-title-bot">
                신선한 컬리의 상품을 검색해보세요.
              </p>
            </div>
            <div className="search-box">
              <span className="search-box-left">검색 조건</span>
              <input
                className="search-box-input"
                onChange={e => this.setState({ inputText: e.target.value })}
                value={inputText}
                onKeyUp={e => this.inputChange(e)}
              />
              <div
                onClick={e => this.inputChange(e)}
                className="search-box-btn"
              >
                검색
              </div>
            </div>
            <div className="search-num">
              <span>
                총 {data.length !== 0 && data.length}개의 상품이 검색되었습니다.
              </span>
            </div>
          </div>
          <div className="search-wrapper">
            <CategoryViewItem bridge2={cateNum} bridge3={data} />
            <PageBtn
              nowPage={nowPage}
              changePageNum={this.changePageNum}
              paging={paging}
            />
            <div style={{ height: "50px" }} />
          </div>
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
export default withRouter(SearchView);
