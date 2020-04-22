import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./ItemCart.scss";
import ItemListRow from "./ItemListRow";
import ItemTableHeader from "./ItemTableHeader";
import ItemTableFooter from "./ItemTableFooter";
import ItemTotalPrice from "./ItemTotalPrice";

class ItemCartChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCount: 0,
      dataProps: {},
      priceItemAll: 0,
      checkedCount: 0,
      chkChecked: true,
      itemList: []
    };
  }

  componentDidMount() {
    this.getAPIData();
  }

  getAPIData = async () => {
    const cart = await fetch("http://localhost:3000/data/cart.json");
    const cartJSON = await cart.json();

    this.setState(
      {
        dataProps: cartJSON.data,
        itemCount: cartJSON.data.products.length,
        checkedCount: cartJSON.data.products.length
      },
      () => {
        this.setState({
          itemList: [
            ...this.state.dataProps.products.map(param => {
              return {
                name: param["name"],
                price: param["price"],
                original_price: param["original_price"],
                ea: param["ea"],
                max_ea: param["max_ea"],
                min_ea: param["min_ea"],
                thumbnail_image_url: param["thumbnail_image_url"],
                checked: true
              };
            })
          ]
        });
      }
    );
  };

  itemCount = e => {
    const { itemList } = this.state;

    const targetIdx = e.target.id.split(".")[0]; // number
    const target = itemList[targetIdx]; // object

    const tempArr = [...itemList];
    const tempObj = { ...target };

    if (e.target.textContent === "+" && tempObj.ea < tempObj.max_ea) {
      tempObj.ea += 1;
    } else if (tempObj.ea !== 1) {
      tempObj.ea -= 1;
    }
    tempArr[targetIdx] = tempObj;
    this.setState({ itemList: tempArr });
  };

  itemCheck = e => {
    const { itemList, itemCount, checkedCount, chkChecked } = this.state;
    const targetIdx = parseInt(e.target.id); // number
    const target = itemList[targetIdx]; // object

    const tempArr = [...itemList]; // itemList 복사
    const tempObj = { ...target }; // 접근할 객체 복사

    let tempChkAll = [];
    let tempAllBoolean = 1;
    let tempCheckedCount = checkedCount;

    // 개별 체크 상태 뒤집어줌
    tempObj.checked ? (tempCheckedCount -= 1) : (tempCheckedCount += 1);
    tempObj.checked = !tempObj.checked;
    tempArr[targetIdx] = tempObj;

    for (let i = 0; i < tempArr.length; i++) {
      tempChkAll.push(tempArr[i].checked);
      tempAllBoolean = Boolean(tempAllBoolean * tempChkAll[i]);
    }

    // 전부 체크 상태에서 -1 눌렸으면
    if (targetIdx === -1) {
      // 전체선택 체크박스인가?
      for (let i = 0; i < tempArr.length; i++) {
        tempArr[i].checked = chkChecked ? false : true;
      }
      this.setState({
        itemList: tempArr,
        chkChecked: !chkChecked,
        checkedCount: chkChecked ? 0 : itemCount
      });
    } else {
      this.setState({
        itemList: tempArr,
        checkedCount: tempCheckedCount,
        chkChecked: tempAllBoolean ? true : false
      });
    }
  };

  deleteItem = row => {
    const { itemCount, checkedCount, chkChecked } = this.state;
    const targetIdx = row;
    console.log(row);

    const tempArr = [...this.state.itemList]; // itemList 복사
    const tempArrFilter = tempArr.filter((_, idx) => idx !== targetIdx);

    this.setState({
      chkChecked: itemCount === 1 ? false : chkChecked,
      itemList: tempArrFilter,
      itemCount: itemCount - 1,
      checkedCount: checkedCount - 1
    });
  };

  itemProductArr = () => {
    const { itemList } = this.state;

    return (
      <ItemListRow
        itemList={!!itemList && itemList}
        itemCheck={this.itemCheck}
        itemCount={this.itemCount}
        deleteItem={this.deleteItem}
      />
    );
  };

  priceCalc = () => {
    const tempArr = [...this.state.itemList]; // itemList 복사

    let priceRst1 = 0,
      priceRst2 = 0,
      priceRst3 = 0,
      priceRst4 = 0,
      resultArr = [];

    for (let i of tempArr) {
      if (i.checked) {
        priceRst1 += i.ea * i.price;
        priceRst2 += i.ea * i.original_price;
        priceRst3 += i.ea * i.price;
        priceRst4 += i.ea * i.price;
      }
    }

    priceRst2 = priceRst2 - priceRst1;
    priceRst3 = 0;
    priceRst4 = priceRst1 - priceRst2 + 3000;

    for (let i of [priceRst1, priceRst2, priceRst3, priceRst4]) {
      resultArr.push(i.toLocaleString());
    }

    return resultArr;
  };

  goToOrder = () => {
    this.props.history.push("/order");
  };

  render() {
    const { itemCount, chkChecked, checkedCount } = this.state;

    return (
      <div className="item">
        <div style={{ padding: "20px 40px 10px" }}></div>
        <div className="item-title">
          <p id="title">장바구니</p>
          <p id="title-desc">
            주문하실 상품명 및 수량을 정확하게 확인해 주세요.
          </p>
        </div>
        <div className="item-content">
          <table className="item-table">
            <tbody>
              <ItemTableHeader
                itemCheck={this.itemCheck}
                itemCount={itemCount}
                chkChecked={chkChecked}
                checkedCount={checkedCount}
              />
              {itemCount !== 0 ? (
                this.itemProductArr()
              ) : (
                <tr>
                  <td className="no-item" colSpan="4">
                    장바구니에 담긴 상품이 없습니다
                  </td>
                </tr>
              )}
              <ItemTableFooter
                itemCheck={this.itemCheck}
                itemCount={itemCount}
                chkChecked={chkChecked}
                checkedCount={checkedCount}
              />
            </tbody>
          </table>
          <ItemTotalPrice priceCalc={this.priceCalc} />
          <button
            onClick={this.goToOrder}
            className={checkedCount ? "order-btn btn-on" : "order-btn btn-off"}
          >
            주문하기
          </button>
          <div className="item-bottom-desc">
            <p>
              ‘입금확인’ 상태일 때는 주문내역 상세 페이지에서 직접 주문취소가
              가능합니다.
            </p>
            <p>‘입금확인’ 이후 상태에는 고객행복센터로 문의해주세요.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ItemCartChild);
