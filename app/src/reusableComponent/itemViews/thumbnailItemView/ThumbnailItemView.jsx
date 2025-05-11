import React from "react";
import _ from "lodash";
import { useTheme } from "@mui/material";
import styles from "./thumbnailItemView.module.css";
import samplebgremove from "../../../assets/samplebgremove.png";
import SvgStringRenderer from "../../SvgReusableRenderer";
import { cartIconItem } from "../../../assets/svgAssets";
import { Chip } from "@mui/material";
const SizeSelector = (props) => {
  const { availableSize } = props;
  const options = ["S", "M", "L", "XL", "XXL"];
  const [selectedSize, setSelectedSize] = React.useState("M");
  const theme = useTheme();
  const handleChange = (size) => {
    setSelectedSize(size);
  };
  return (
    <div className={styles.sizeSelectorParent}>
      {options.map((item, index) => {
        const isAvailable = _.includes(availableSize, item);
        const isSelected = selectedSize === item;

        return (
          <div
            key={index}
            className={styles.sizeSelectorItemParent}
            style={{
              cursor: isAvailable ? "pointer" : "not-allowed",
              opacity: isAvailable ? 1 : 0.4,
            }}
            onClick={() => {
              console.log("Clicked");
              if (isAvailable) handleChange(item);
            }}
          >
            <div
              className={styles.sizeSelectorBoxParent}
              style={{
                border: `1.8px solid ${
                  isAvailable ? "black" : theme.palette.disable.main
                }`,
              }}
            >
              {isSelected && <div className={styles.sizeSelectorseletedBox} />}
            </div>
            <span style={{ fontSize: "13px" }}>{item}</span>
          </div>
        );
      })}
    </div>
  );
};
const ThumbnailItemView = (props) => {
  const {
    id,
    name,
    gender,
    ageGroup,
    price,
    discount,
    maxStock,
    sizeAvailabilibity,
  } = props;
  const theme = useTheme();
  return (
    <div className={styles.parentTumbnail}>
      <div className={styles.imageContainer}>
        <img src={samplebgremove} height={"100%"} width={"100%"} />
      </div>
      <div className={styles.infoContainerS}>
        <div className={styles.nameContainer}>
          <span className={styles.productName}>{name}</span>
          <Chip
            label={"View Product"}
            onClick={() => {}}
            variant="outlined"
            sx={{
              background: theme.palette.custom.lightSecondary,
              color: "#FFF",
              paddingLeft: "5px",
              paddingRight: "5px",
              "&:hover": {
                color: "#000", // Hover font color
                backgroundColor: "#f0f0f0", // optional
              },
            }}
          ></Chip>
        </div>
        <div className={styles.gaContainer}>
          <div>
            <span className={styles.productName}>Gender:</span>
            <span className={styles.nameValue}>{gender}</span>
          </div>
          <div>
            <span className={styles.productName}>Age:</span>
            <span className={styles.nameValue}>{ageGroup}</span>
          </div>
        </div>
        <SizeSelector availableSize={sizeAvailabilibity} />
        <div className={styles.priceContainer}>
          <span className={styles.productName}>INR: </span>
          <span
            className={styles.nameValue}
            style={{
              textDecoration: "line-through",
            }}
          >
            {`₹${price}`}
          </span>
          <span
            className={styles.nameValue}
            style={{
              color: "green",
            }}
          >{`${discount}%off`}</span>
          <span
            className={styles.nameValue}
            style={{
              color: "green",
            }}
          >
            {`₹${price - (price * discount) / 100}`}
          </span>
          <div className={styles.cartWrapper}>
            <SvgStringRenderer svgString={cartIconItem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailItemView;
