import React, { useEffect, useState } from "react";
import MainItem from "../MainItem";

const Recommend = ({ title, products }) => {
  const [offsetX, setOffsetX] = useState(0);

  const productsArr =
    products &&
    products.map((param, idx) => {
      return (
        <MainItem
          key={"prod" + idx}
          cN="products-item"
          no={param["no"]}
          name={param["name"]}
          price={param["price"]}
          original_price={param["original_price"]}
          // thumbnail_image_url={param["thumbnail_image_url"]}
          thumbnail_image_url={param["list_image_url"]}
          sticker_image_url={param["sticker_image_url"]}
          // style={this.state.moveX}
        />
      );
    });

  return (
    <>
      <p className="main-font">{title}</p>
      <div
        style={{
          position: "relative"
        }}
      >
        <button
          // onClick={this.moveLeft}
          style={{}}
          className="btn-scroll btn-scroll-left"
        ></button>
        <button
          // onClick={this.moveRight}
          className="btn-scroll btn-scroll-right"
        ></button>
      </div>
      <div
        style={{ overflow: "hidden", width: "1050px", margin: "0 auto" }}
        className="goods-item"
      >
        {productsArr}
      </div>
    </>
  );
};

export default Recommend;
