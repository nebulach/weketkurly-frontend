import React, { Component } from "react";
import Nav from "../../Components/Layout/Nav";
import MyPage from "../../Components/OrderList/MyPage";
import MyKurly from "../../Components/OrderList/MyKurly";
import MyOrderList from "../../Components/OrderList/MyOrderList/MyOrderList";
import List from "../../Components/OrderList/MyOrderList/List";
import Footer from "../../Components/Layout/Footer";
import "./OrderList.scss";
import { API_JONG } from "../../global/env";

export default class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      dataProps: {},
      itemList: [],
      convertedArr: []
    };
  }

  componentDidMount = () => {
    this.getAPIData();
    // fetch("http://localhost:3000/data/order.json")
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       order: res.order
    //     });
    //   });
  };

  getAPIData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("wetoken"));
    myHeaders.append("Content-Type", "application/json");

    const cart = await fetch(`${API_JONG}/orders/cart`, {
      method: "GET",
      headers: myHeaders
    });
    // const cart = await fetch("http://localhost:3000/data/cart.json");
    const cartJSON = await cart.json();
    console.log(cartJSON);

    this.setState(
      {
        dataProps: cartJSON.data
      },
      () => {
        this.setState(
          {
            itemList: [
              ...this.state.dataProps.map(param => {
                console.log(param);
                return {
                  no: param["product_num"],
                  product_name: param["name"],
                  price: param["discounted_price"],
                  original_price: param["original_price"],
                  ea: param["ea"],
                  max_ea: param["max_ea"],
                  min_ea: param["min_ea"],
                  thumbnail_image_url: param["thumbnail_image_url"],
                  checked: true
                };
              })
            ]
          },
          () => this.convertArr(this.state.itemList)
        );
      }
    );
  };

  convertArr = arr => {
    console.log(arr);

    let sum = 0;
    for (let i of arr) {
      sum += i.price;
    }

    let resultArr = [
      {
        product_name: `${arr[0].product_name} 외 ${arr.length - 1}`,
        no: arr[0].product_num,
        thumbnail_image_url: arr[0].thumbnail_image_url,
        price: sum
      }
    ];
    this.setState({ convertedArr: resultArr });
  };

  render() {
    return (
      <div className="OrderList">
        <Nav />
        <MyPage />
        <div className="contents">
          <MyKurly />
          <MyOrderList
            orderlist={this.state.convertedArr.map(el => {
              return (
                <List
                  key={el.no}
                  no={el.no}
                  product_name={el.product_name}
                  status={el.status}
                  thumb={el.thumbnail_image_url}
                  review_button_flag={el.review_button_flag}
                  price={el.price}
                />
              );
            })}
          />
        </div>
        <Footer />
      </div>
    );
  }
}
