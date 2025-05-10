import React from "react";
import styles from "./grainyGradiant.module.css";
const GrainyGradiant = (props) => {
  return <div className={styles.parent}>{props.children}</div>;
};

export default GrainyGradiant;
