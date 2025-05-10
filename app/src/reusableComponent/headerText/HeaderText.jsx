import React from "react";
import styles from "./HeaderText.module.css";
const HeaderText = (props) => {
  const { textMsg } = props;
  return (
    <div
      style={{
        display: "block",
        // border: "1px solid black",
        width: "20%",
        flexDirection: "column",
      }}
    >
      <div
        style={{ border: "1px solid black", height: "1px", width: "25px" }}
      ></div>
      <span className={styles.boldTextHeader}>{textMsg}</span>
      <div
        style={{
          position: "relative",
          border: "1px solid black",
          height: "1px",
          width: "25px",
          left: "50%",
        }}
      ></div>
    </div>
  );
};

export default HeaderText;
