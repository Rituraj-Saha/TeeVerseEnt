import React from "react";
import styles from "./bannerTop.module.css";

const BannerTop = () => {
  const bannerPointer = [
    {
      msg: "Speak Your Mind in Style",
      svg: "🗣️",
    },
    {
      msg: "Curated & Custom Quotes",
      svg: "📝",
    },
    {
      msg: "High-Quality, Fade-Resistant Prints",
      svg: "🎨",
    },
    {
      msg: "Comfort Meets Attitude",
      svg: "👕",
    },

    {
      msg: "Made to Inspire & Empower",
      svg: "💬",
    },
  ];
  return (
    <div className={styles.parent}>
      <div className={styles.msgLine}>
        <span className={styles.whitecolorText}>
          Wear your style and follow the trend with{" "}
        </span>
        <span className={styles.outColorText}>40k+ </span>
        <span className={styles.whitecolorText}>others</span>
      </div>
      <div className={styles.bannerPointerContainer}>
        {bannerPointer.map((item, idx) => {
          return (
            <div key={idx} className={styles.bannerPinterItem}>
              <span className={styles.emojiStyle}>{item.svg}</span>
              <span className={styles.emojiText}>{item.msg}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BannerTop;
