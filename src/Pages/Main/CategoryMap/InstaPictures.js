import React from "react";

const InstaPictures = ({ title, reviews, moveX }) => {
  const instaReviewList =
    reviews &&
    reviews.map((param, idx) => {
      return (
        <a
          key={"revw" + idx}
          style={{
            transform: `translateX(${moveX}px)`,
            display: "block",
            width: "249px",
            height: "320px"
          }}
          href={param["landing_url"]}
        >
          <img
            className="insta-img"
            key={idx}
            src={param["thumbnail_image_url"]}
            alt="review"
          />
        </a>
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
          style={{ top: "57.5px" }}
          className="btn-scroll btn-scroll-left"
        ></button>
        <button
          style={{ top: "57.5px" }}
          className="btn-scroll btn-scroll-right"
        ></button>
      </div>
      <ul
        className="goods-item"
        style={{ overflow: "hidden", width: "1050px" }}
      >
        {instaReviewList}
      </ul>
      {/* <button onClick={this.moveLeft}>-175px</button>
            <button onClick={this.moveRight}>+175px</button> */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontSize: "16px",
          lineHeight: "29px",
          padding: "39px 100px"
        }}
      >
        <p style={{ color: "#999", display: "block" }}>
          더 많은 고객 후기가 궁금하다면?
        </p>
        <p style={{ fontWeight: "700", display: "block" }}>
          @marketkuly_regram
        </p>
      </div>
    </>
  );
};

export default InstaPictures;
