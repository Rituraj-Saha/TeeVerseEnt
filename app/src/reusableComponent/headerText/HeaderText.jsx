import React from "react";
import styles from "./HeaderText.module.css";
const HeaderText = (props) => {
  const { textMsg } = props;
  return (
    <div className={styles.headerParent}>
      <div className={styles.headerTextDecorationLeft}></div>
      <span className={styles.boldTextHeader}>{textMsg}</span>
      <div className={styles.headerTextDecorationRight}></div>
    </div>
  );
};

export default HeaderText;
