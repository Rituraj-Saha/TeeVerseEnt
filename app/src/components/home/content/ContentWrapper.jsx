import React from "react";
import styles from "./contentWrapper.module.css";
import BannerTop from "./banners/bannerTop/BannerTop";
import StoreWrapper from "./store/StoreWrapper";
import BannerMid from "./banners/bannerMid/BannerMid";
const ContentWrapper = () => {
  return (
    <div className={styles.parent}>
      <BannerTop />
      <span className={styles.featBoldTextStyle}>Our featured Store</span>
      <StoreWrapper />
      <BannerMid />
    </div>
  );
};

export default ContentWrapper;
