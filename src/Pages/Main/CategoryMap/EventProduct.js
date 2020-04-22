import React from "react";

const EventProduct = ({ title, events }) => {
  const eventList =
    events &&
    events.map((param, idx) => {
      return (
        <div
          key={"evt" + idx}
          style={{ textAlign: "center" }}
          className="product-item"
        >
          <ul>
            <li>
              <a
                style={{ overflow: "hidden", display: "inline-block" }}
                href={param["landing_url"]}
              >
                <img
                  className="zoom-in"
                  // src={"https://" + param["image_url"]}
                  src={param["image"]}
                  key={idx}
                  alt=""
                />
              </a>
              <p
                style={{
                  marginTop: "17px",
                  fontWeight: "700",
                  color: "#333",
                  fontSize: "18px",
                  lineHeight: "28px",
                  letterSpacing: "-0.3px"
                }}
              >
                {param["title"]}
              </p>
              <p
                style={{
                  paddingTop: "8px",
                  color: "#999",
                  fontSize: "16px",
                  lineHeight: "20px"
                }}
              >
                {param["subtitle"]}
              </p>
            </li>
          </ul>
        </div>
      );
    });

  return (
    <div style={{ backgroundColor: "#f7f7f7", width: "100vw" }}>
      <p className="main-font">{title}</p>
      <div
        style={{ justifyContent: "center", overflow: "hidden" }}
        className="goods-item"
      >
        {eventList}
      </div>
    </div>
  );
};

export default EventProduct;
