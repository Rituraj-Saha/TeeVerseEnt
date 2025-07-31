import React from "react";
import styles from "./bannerMid.module.css";
import sample from "../../../../../assets/WhatsApp Image 2025-07-31 at 10.26.50 AM.jpeg";
const BannerMid = () => {
  return (
    <div className={styles.parent}>
      <img
        src={sample}
        width={"100%"}
        style={{
          objectFit: "fill",
        }}
      ></img>
    </div>
  );
};

export default BannerMid;
