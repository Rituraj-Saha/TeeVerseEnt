import React from "react";
import styles from "./vision.module.css";
import SvgStringRenderer from "../../../reusableComponent/SvgReusableRenderer";
import { useTheme } from "@mui/material";
import {
  customDesign,
  hastleFreeDelivery,
  qualityCheck,
  trendyWear,
} from "../../../assets/svgAssets";
import HeaderText from "../../../reusableComponent/headerText/HeaderText";

const offering = [
  {
    tag: "Shop for trendy wear",
    desc: "Get the trendy fashion at your fingerTip",
    svg: trendyWear,
  },
  {
    tag: "Customise with your design",
    desc: "Get the trendy fashion at your fingerTip",
    svg: customDesign,
  },
  {
    tag: "Premium quality",
    desc: "Get the trendy fashion at your fingerTip",
    svg: qualityCheck,
  },
  {
    tag: "Hastle free delivery",
    desc: "Get the trendy fashion at your fingerTip",
    svg: hastleFreeDelivery,
  },
];
const Vision = () => {
  const theme = useTheme();
  return (
    <div className={styles.parent}>
      <HeaderText textMsg={"We Deliver"} />
      <div className={styles.visonparentcontainer}>
        {offering.map((item, idx) => {
          return (
            <div className={styles.visionContextContainer} key={idx}>
              <div
                style={{
                  display: "flex",
                  flex: 0.2,
                  padding: "5px",
                }}
              >
                {" "}
                <SvgStringRenderer
                  svgString={item.svg}
                  height={"70%"}
                  width={"80%"}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: ".8",
                }}
              >
                <span
                  style={{
                    color: "white",
                  }}
                >
                  {item.tag}
                </span>
                <span
                  style={{
                    color: "white",
                    fontSize: "12px",
                  }}
                >
                  {item.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Vision;
