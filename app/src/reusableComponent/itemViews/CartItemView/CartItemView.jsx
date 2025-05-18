import React from "react";

const CartItemView = (props) => {
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid black",
        height: "30vh",
        width: "65vw",
      }}
    >
      {console.log("i am called from cartitemview")}
      <div
        style={{
          display: "flex",
          border: "1px solid black",
          flex: "0.4",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          border: "1px solid black",
          flex: "0.6",
          flexDirection: "column",
        }}
      >
        <span>sample name</span>
        <span>Price container</span>
        <span>
          Address bar with edit container on click open a dialog to saved
          address or new address
        </span>
      </div>
    </div>
  );
};

export default CartItemView;
