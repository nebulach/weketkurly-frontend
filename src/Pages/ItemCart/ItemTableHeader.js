import React from "react";

const ItemTableHeader = ({
  itemCheck,
  chkChecked,
  checkedCount,
  itemCount
}) => {
  return (
    <tr className="item-table-header">
      <td
        style={{
          width: "375px"
        }}
      >
        <input
          id="-1chk"
          onClick={itemCheck}
          checked={chkChecked}
          type="checkbox"
        />
        <label htmlFor="-1chk" />
        <span>
          전체선택(
          {`${checkedCount}/${itemCount}`})
        </span>
      </td>
      <td style={{ width: "432px" }}>
        <span>상품 정보</span>
      </td>
      <td style={{ width: "115px" }}>
        <span>수량</span>
      </td>
      <td style={{ width: "115px" }}>
        <span>상품금액</span>
      </td>
    </tr>
  );
};

export default ItemTableHeader;
