import React from "react";
import styles from "./bannerMid.module.css";
import sample from "../../../../../assets/sample.jpg";
const BannerMid = () => {
  return (
    <div className={styles.parent}>
      <div
        style={{
          display: "flex",
          flex: 0.8,
        }}
      >
        <div
          style={{
            display: "flex",
            background: "white",
            flex: 0.2,
            height: "100%",
            rotate: "45deg",
            borderRadius: "25px",
            boxShadow: "0 4px 30px rgba(225, 94, 114, 0.632)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={sample}
            height={"80%"}
            width={"80%"}
            style={{ borderRadius: "25px" }}
          ></img>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          background: "white",
          flex: 0.2,
          height: "100%",
          rotate: "-45deg",
          borderRadius: "25px",
          boxShadow: "0 4px 30px rgba(225, 94, 114, 0.632)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={sample}
          height={"70%"}
          width={"70%"}
          style={{ borderRadius: "25px" }}
        ></img>
      </div>
      {/* <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "#333",
          pointerEvents: "none", // so it doesn't block clicks
        }}
      >
        Your Text Here
      </div> */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "left",
          color: "#222",
          fontFamily: "sans-serif",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            marginBottom: "16px",
          }}
        >
          We Believe In Everyday Originality ✨
        </div>
        <div
          style={{ fontSize: "1.2rem", marginBottom: "10px", color: "#FFF" }}
        >
          Colour With Soul 🎨
        </div>
        <div
          style={{ fontSize: "1.2rem", marginBottom: "10px", color: "#222" }}
        >
          Tees That Talk 🗣️
        </div>
        <div style={{ fontSize: "1.2rem", color: "#FFF", fontStyle: "italic" }}>
          Style Stitched With Love ❤️
        </div>
      </div>
    </div>
  );
};

export default BannerMid;
