import React from "react";

const ItemTotalPrice = ({ priceCalc }) => {
  return (
    <div className="item-price">
      <div>
        <span className="item-price-desc">상품금액</span>
        <span className="item-price-price">
          {priceCalc()[0].toLocaleString()}원
        </span>
      </div>
      <span className="item-price-oper">-</span>
      <div>
        <span className="item-price-desc">상품할인금액</span>
        <span className="item-price-price">{priceCalc()[1]}원</span>
      </div>
      <span className="item-price-oper">+</span>
      <div>
        <span className="item-price-desc">배송비</span>
        <span className="item-price-price">
          3,000원
          <p>{priceCalc()[2].toLocaleString()}원 추가주문 시, 무료배송</p>
        </span>
      </div>
      <span className="item-price-oper">=</span>
      <div style={{ backgroundColor: "#f7f7f7" }}>
        <span className="item-price-desc">결제예정금액</span>
        <span className="item-price-price">
          {priceCalc()[3].toLocaleString()}원
        </span>
      </div>
    </div>
  );
};

export default ItemTotalPrice;
