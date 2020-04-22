import React from "react";

const ItemTableFooter = ({
  itemCheck,
  chkChecked,
  checkedCount,
  itemCount
}) => {
  return (
    <tr>
      <td align="left" colSpan="4">
        <div className="item-wrapper-btn">
          <input
            id="-1chk"
            onClick={itemCheck}
            checked={chkChecked}
            type="checkbox"
          />
          <label htmlFor="-1chk" />
          <span style={{ paddingRight: "15px" }}>
            전체선택(
            {`${checkedCount}/${itemCount}`})
          </span>
          <button>선택 삭제</button>
          <button style={{ width: "120px" }}>품절 상품 삭제</button>
        </div>
      </td>
    </tr>
  );
};

export default ItemTableFooter;
