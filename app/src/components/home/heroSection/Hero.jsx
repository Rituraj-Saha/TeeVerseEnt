import React from "react";
import styles from "./Hero.module.css";
import SvgStringRenderer from "../../../reusableComponent/SvgReusableRenderer";
import { playBtn, svgOK } from "../../../assets/svgAssets";
import { Chip, useTheme } from "@mui/material";
import CaroualImpl from "app/src/reusableComponent/carousal/Carousel";
const Hero = () => {
  const theme = useTheme();
  const valueAdder = [
    {
      svg: svgOK,
      msg: "Free Register",
    },
    {
      svg: svgOK,
      msg: "Great Service",
    },
    {
      svg: svgOK,
      msg: "Superior Quality",
    },
  ];
  const boldMsg = {
    msg: "Getting the best and latest style has never",
    boldTxt: "been easier!",
  };
  const statMsg =
    "Tee-verse is a platform that helps to make fashion accessible to all. It brings fashion to your doorstep!";

  const items = [
    <div className="h-74 w-full bg-red-400 flex items-center justify-center text-white text-3xl font-bold rounded-xl shadow-xl">
      Slide 1
    </div>,
    <div className="h-74 w-full bg-blue-400 flex items-center justify-center text-white text-3xl font-bold rounded-xl shadow-xl">
      Slide 2
    </div>,
    <div className="h-74 w-full bg-green-400 flex items-center justify-center text-white text-3xl font-bold rounded-xl shadow-xl">
      Slide 3
    </div>,
  ];
  return (
    <div className={styles.parent}>
      <div
        style={{
          display: "flex",
          flex: 0.5,
          minHeight: "100% !important",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className={styles.glassEffectOne}>
          {valueAdder.map((item, idx) => {
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <SvgStringRenderer
                  svgString={item.svg}
                  height={"30px"}
                  width={"30px"}
                />
                <span className={styles.valueAdderTextStyle}>{item.msg}</span>
              </div>
            );
          })}
        </div>
        <span className={styles.boldMsgTxt}>{boldMsg.msg}</span>
        <span className={styles.boldMsgTxtBolder}>{boldMsg.boldTxt}</span>
        <span className={styles.statMsg}>{statMsg}</span>

        <div
          style={{
            display: "flex",
            marginTop: "15px",
            gap: "50px",
            flex: 1,
            maxHeight: "8vh",
            width: "100%",
            paddingLeft: "5vw",
            paddingTop: "1vh",
            paddingBottom: "1vh",
          }}
        >
          <span
            style={{
              display: "flex",
              paddingLeft: "15px",
              paddingRight: "15px",
              paddingBottom: "10px",
              paddingTop: "10px",
              background: theme.palette.info.main,
              fontSize: "15px",
              color: "white",
              borderRadius: "5px",
              fontWeight: "100",
              alignItems: "center",
            }}
          >
            Shop Collection
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: "5px",
            }}
          >
            <SvgStringRenderer
              svgString={playBtn}
              height={"30px"}
              width={"30px"}
            />
            <span
              style={{
                fontSize: "15px",
                fontWeight: "800",
              }}
            >
              Watch Review
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flex: 0.5,
          // border: "1px solid black",
          minHeight: "100%",
          paddingBottom: "5%",
        }}
      >
        <CaroualImpl items={items} />
      </div>
    </div>
  );
};

export default Hero;
