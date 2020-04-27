import React from "react";

const DetailImage = ({ info }) => {
  return <div dangerouslySetInnerHTML={{ __html: info.product_image }}></div>;
};

export default DetailImage;
