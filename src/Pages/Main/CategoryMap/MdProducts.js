import React from "react";
import MainItem from "../MainItem";

const MdProducts = ({
  title,
  data,
  categories,
  mdButtonSelect,
  mdButtonValue,
  mdClick
}) => {
  const buttonStyle = {
    border: "1px solid #5f0081",
    backgroundColor: "#5f0080",
    color: "#fff"
  };

  const categoryList =
    categories &&
    categories.map((param, idx) => {
      return (
        <button
          key={"mdcate" + idx}
          style={mdButtonSelect === idx ? buttonStyle : null}
          className="md-cate-button"
          // id={param["no"] + "." + idx}
          id={param["id"] + "." + idx}
          onClick={mdClick}
        >
          {param["name"]}
        </button>
      );
    });

  const mdProductsArr =
    data &&
    data.map((param, idx) => {
      return (
        <MainItem
          key={"md" + idx}
          cN="products-item"
          no={param["no"]}
          name={param["name"]}
          price={param["price"]}
          original_price={param["original_price"]}
          // thumbnail_image_url={param["thumbnail_image_url"]}
          thumbnail_image_url={param["list_image_url"]}
          sticker_image_url={param["sticker_image_url"]}
          // style={moveX}
        />
      );
    });

  return (
    <div>
      <p className="main-font">{title}</p>
      <div
        style={{
          position: "relative"
        }}
      >
        <button
          style={{ top: "260px" }}
          className="btn-scroll btn-scroll-left"
        ></button>
        <button
          style={{ top: "260px" }}
          className="btn-scroll btn-scroll-right"
        ></button>
      </div>
      <div
        style={{
          paddingBottom: "20px",
          margin: "0 auto",
          overflow: "hidden",
          width: "1050px"
        }}
        className="md-cate-div"
      >
        {categoryList}
      </div>
      <ul
        style={{ overflow: "hidden", width: "1050px" }}
        className="goods-item"
      >
        {mdProductsArr}
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "514px",
            height: "54px",
            borderRadius: "3px",
            border: "1px solid #e3e3e3",
            textAlign: "center"
          }}
        >
          <span
            style={{
              fontSize: "16px",
              verticalAlign: "middle"
            }}
          >
            {mdButtonValue + " 전체보기"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MdProducts;
