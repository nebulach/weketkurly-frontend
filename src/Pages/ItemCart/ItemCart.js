import React, { Component } from "react";
import ItemCartChild from "./ItemCartChild";
import Nav from "../../Components/Layout/Nav";
import Footer from "../../Components/Layout/Footer";
import "./ItemCart.scss";

class ItemCart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Nav />
        <ItemCartChild />
        <Footer />
      </>
    );
  }
}

export default ItemCart;
