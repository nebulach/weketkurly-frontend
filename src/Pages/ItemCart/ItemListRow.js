import React from "react";

const ItemListRow = ({ itemList, itemCheck, itemCount, deleteItem }) => {
  return itemList.map((param, idx) => {
    return (
      <tr
        key={idx}
        className="item-table-row"
        style={{ borderBottom: "2px solid #ddd" }}
      >
        <td align="left" style={{ display: "flex", alignItems: "center" }}>
          <input
            id={idx + "chk"}
            onClick={itemCheck}
            checked={itemList[idx].checked ? true : false}
            type="checkbox"
          />
          <label htmlFor={idx + "chk"} />
          <img src={param["thumbnail_image_url"]} alt="" />
        </td>
        <td align="left">
          <p className="item-table-row-title">{param["name"]}</p>
          <p className="item-table-row-price">
            {param["price"].toLocaleString()}원
          </p>
        </td>
        <td className="item-table-row-count">
          <div>
            <button
              id={`${idx}.${param["price"]}.${param["ea"]}`}
              onClick={e => itemCount(e, param.id)}
              style={{ borderRight: "1px solid #ddd" }}
            >
              -
            </button>
            <span>{itemList && String(itemList[idx]["ea"])}</span>
            <button
              id={`${idx}.${param["price"]}.${param["ea"]}`}
              onClick={e => itemCount(e, param.id)}
              style={{ borderLeft: "1px solid #ddd" }}
            >
              +
            </button>
          </div>
        </td>
        <td>
          {(itemList[idx]["ea"] * itemList[idx]["price"]).toLocaleString()}
        </td>
        <td
          onClick={() => deleteItem(idx, param.id)}
          // id={`${idx}.${param["price"]}.${param["ea"]}`}
        >
          <img
            className="del-btn"
            src="https://res.kurly.com/pc/ico/1801/btn_close_24x24_514859.png"
            alt="삭제"
          />
        </td>
      </tr>
    );
  });
};

export default ItemListRow;
