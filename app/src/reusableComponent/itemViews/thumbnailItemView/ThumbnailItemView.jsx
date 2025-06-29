import React from "react";
import _ from "lodash";
import { useTheme } from "@mui/material";
import styles from "./thumbnailItemView.module.css";
import SvgStringRenderer from "../../SvgReusableRenderer";
import { cartIconItem } from "../../../assets/svgAssets";
import { Chip } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../../../storeCofig/feature/cartStore/CartSlice";
import { useSizeAvailability } from "../../../../../utils/useSizeAvailabilty";
import { Link } from "react-router";

const CartButtonOrCounter = (product) => {
  const dispatch = useDispatch();
  const cartId = `${product.id}-${product.selectedSize}`;
  const cartItem = useSelector((state) =>
    state.cart.cartItems.find((item) => item?.cid === cartId)
  );
  const quantity = !_.isEmpty(cartItem) ? cartItem?.quantity : 0;
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        // cid: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
        cid: cartId,
      })
    );
  };

  const handleIncrement = () => {
    if (quantity < product?.maxStock) {
      dispatch(incrementQuantity(cartId));
    } else {
      toast.warning(`Maximum limit (${product?.maxStock}) reached`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(decrementQuantity(cartId));
    } else if (quantity === 1) {
      dispatch(removeFromCart(cartId));
    }
  };

  return (
    <div>
      {quantity === 0 ? (
        <div onClick={handleAddToCart} className={styles.cartWrapper}>
          <SvgStringRenderer svgString={cartIconItem} />
        </div>
      ) : (
        <div className={styles.counterContainer}>
          <button onClick={handleDecrement} className={styles.counterBtn}>
            -
          </button>
          <span className={styles.counterValue}>{quantity}</span>
          <button onClick={handleIncrement} className={styles.counterBtn}>
            +
          </button>
        </div>
      )}
    </div>
  );
};

export const SizeSelector = (props) => {
  const { availableSize, selectedSize, setSelectedSize } = props;
  const options = ["S", "M", "L", "XL", "XXL"];

  const theme = useTheme();
  const handleChange = (size) => {
    setSelectedSize(size);
  };
  return (
    <div className={styles.sizeSelectorParent}>
      {options.map((item, index) => {
        const isAvailable = availableSize.some(
          (sizeObj) => sizeObj.size === item
        );
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
export const PriceContainer = (props) => {
  return (
    <div className={styles.priceContainer}>
      <span className={styles.productName}>INR: </span>
      <span
        className={styles.nameValue}
        style={{
          textDecoration: "line-through",
        }}
      >
        {`₹${props.price}`}
      </span>
      <span
        className={styles.nameValue}
        style={{
          color: "green",
        }}
      >{`${props.discount}%off`}</span>
      <span
        className={styles.nameValue}
        style={{
          color: "green",
        }}
      >
        {`₹${props.price - (props.price * props.discount) / 100}`}
      </span>
      {/* <div className={styles.cartWrapper}>
            <SvgStringRenderer svgString={cartIconItem} />
          </div> */}

      <CartButtonOrCounter
        id={props.id}
        name={props.name}
        gender={props.gender}
        ageGroup={props.ageGroup}
        price={props.price}
        discount={props.discount}
        maxStock={props.maxStock}
        selectedSize={props.selectedSize}
        sellingPrice={props.price - (props.price * props.discount) / 100}
        thubnailImage={props.thubnailImage}
      />
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
    thubnailImage,
  } = props;
  const theme = useTheme();

  const { sizeAvailability, selectedSize, setSelectedSize, getMaxStock } =
    useSizeAvailability(id);
  return (
    <div className={styles.parentTumbnail}>
      <div className={styles.imageContainer}>
        <img src={thubnailImage} height={"100%"} width={"100%"} />
      </div>
      <div className={styles.infoContainerS}>
        <div className={styles.nameContainer}>
          <span className={styles.productName}>{name}</span>
          <Link to={`/products/${id}`}>
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
          </Link>
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
        <SizeSelector
          availableSize={sizeAvailability}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />

        <PriceContainer
          id={id}
          name={name}
          gender={gender}
          ageGroup={ageGroup}
          price={price}
          discount={discount}
          maxStock={getMaxStock(selectedSize)}
          selectedSize={selectedSize}
          sellingPrice={price - (price * discount) / 100}
          thubnailImage={thubnailImage}
        />
      </div>
    </div>
  );
};

export default ThumbnailItemView;
