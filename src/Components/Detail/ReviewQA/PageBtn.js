import React, { Component } from "react";
import "./PageBtn.scss";
import { withRouter } from "react-router-dom";

class PageBtn extends Component {
  // total: 317
  // total_page_no: 4

  mkButton = () => {
    const arr = this.mkArr();
    const numArr = arr.map((_, idx) => {
      console.log(this.props);
      return (
        <button
          onClick={() => this.props.changePageNum(idx + 1)}
          className={this.props.nowPage === idx + 1 && "num"}
        >
          {idx + 1}
        </button>
      );
    });

    return numArr;
  };

  mkArr = () => {
    const { total_page_no } = this.props.paging;
    let arr = [];
    for (let i = 0; i < total_page_no; i++) {
      arr.push(i + 1);
    }
    return arr;
  };

  render() {
    return (
      <div className="page-btn">
        <button />
        <button className="before" />
        {/* <button className="num">1</button> */}
        {this.mkButton()}
        <button className="next" />
        <button />
      </div>
    );
  }
}

export default withRouter(PageBtn);
