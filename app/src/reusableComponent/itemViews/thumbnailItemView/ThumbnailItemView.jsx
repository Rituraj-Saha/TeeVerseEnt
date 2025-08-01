import React from "react";
import _ from "lodash";
import { useTheme } from "@mui/material";
import styles from "./thumbnailItemView.module.css";
import SvgStringRenderer from "../../SvgReusableRenderer";
import { cartIconItem } from "../../../assets/svgAssets";
import { Chip } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../../../storeCofig/feature/cartStore/CartSlice";
import { useSizeAvailability } from "../../../../../utils/useSizeAvailabilty";
import { Link } from "react-router";
// import { Address } from "app/src/assets/payload/Address";

const CartButtonOrCounter = (product) => {
  const { showPrice } = product;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.id);
  const cartId = `${userId}-${product.id}-${product.selectedSize}`;
  const cartItem = useSelector((state) =>
    state.cart.cartItems.find((item) => item?.cid === cartId)
  );
  const address = useSelector((state) => state.user.address);
  const quantity = !_.isEmpty(cartItem) ? cartItem?.quantity : 0;
  const handleAddToCart = () => {
    setIsClicked(true);
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        // cid: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
        cid: cartId,
        address: address.find((value) => value.default),
      })
    );
    setTimeout(() => setIsClicked(false), 400);
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
  const [isClicked, setIsClicked] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        border: "1px solid black",
        borderRadius: "5px",
        boxShadow: "2 20px 40px rgba(225, 94, 114, 0.632)",
      }}
    >
      {quantity === 0 ? (
        <motion.div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            flex: 1,
            // justifyContent: "space-around",
            padding: "2px",
            cursor: "pointer",
            overflow: "hidden", // for pulse
            borderRadius: "5px", // match parent
            boxShadow: "2 2px 40px rgba(225, 94, 114, 0.632)",
          }}
          whileHover={{
            scale: 1.05,
            // boxShadow: "0px 0px 8px rgba(0, 180, 0, 0.3)",
            backgroundColor: "#16a34a",
            color: "#fff",
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={handleAddToCart}
        >
          {isClicked && (
            <motion.div
              initial={{ opacity: 0.4, scale: 1 }}
              animate={{ opacity: 0, scale: 2 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "100px",
                height: "100px",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
          )}
          <span
            style={{
              display: "flex",
              flex: 0.9,
              fontSize: "14px",
              fontWeight: "600",
              fontFamily: '"Poppins", "Helvetica", "Arial", "sans-serif"',
              paddingLeft: "10px",
            }}
          >
            Add To Cart
          </span>
          <div className={styles.cartWrapper}>
            <SvgStringRenderer svgString={cartIconItem} />
          </div>
        </motion.div>
      ) : (
        <div className={styles.counterContainer}>
          <button onClick={handleDecrement} className={styles.counterBtn}>
            -
          </button>
          <span
            className={styles.counterValue}
          >{`Selected Qty: ${quantity}`}</span>
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
  const {
    showCart = true,
    usedForProductDetails = false,
    showPrice = true,
  } = props;
  // console.log(`Sc: ${showCart} Sp:${showPrice}`);
  return (
    <div
      className={styles.priceContainer}
      style={{ justifyContent: showPrice ? "start" : "center" }}
    >
      {showPrice && (
        <div style={{ display: "flex", flex: 0.5, width: "50%" }}>
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
        </div>
      )}

      {/* <div className={styles.cartWrapper}>
            <SvgStringRenderer svgString={cartIconItem} />
          </div> */}

      {showCart && (
        // <div style={{ width: usedForProductDetails ? "50%" : "100%" }}>
        <CartButtonOrCounter
          // id={props.id}
          // productName={props.productName}
          // gender={props.gender}
          // ageGroup={props.ageGroup}
          // price={props.price}
          // discount={props.discount}
          // maxStock={props.maxStock}
          // selectedSize={props.selectedSize}
          // sellingPrice={props.price - (props.price * props.discount) / 100}
          // thubnailImage={props.thubnailImage}
          {...props}
          showPrice={showPrice}
        />
        // </div>
      )}
    </div>
  );
};
export const InfoContainer = (props) => {
  const {
    id,
    productName,
    gender,
    ageGroup,
    price,
    discount,
    maxStock,
    thubnailImage,
    description,
    showDescription = false,
    showViewproduct = true,
    usedForProductDetails = false,
  } = props;
  const theme = useTheme();
  const { sizeAvailability, selectedSize, setSelectedSize, getMaxStock } =
    useSizeAvailability(id);
  return (
    <div className={styles.infoContainerS}>
      <div className={styles.nameContainer}>
        <span className={styles.productName}>{productName}</span>
        {showViewproduct && (
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
        )}
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
      {showDescription && (
        <span className={styles.nameValue} style={{ paddingLeft: "15px" }}>
          {" "}
          {description}
        </span>
      )}
      {
        <PriceContainer
          {...props}
          usedForProductDetails={usedForProductDetails}
          showCart={false}
        />
      }
      <span style={{ display: "flex" }}>
        <span
          className={styles.productName}
          style={{ paddingLeft: "15px", flex: ".5" }}
        >
          Select size
        </span>
        {
          <span
            className={styles.productName}
            style={{
              display: "flex",
              paddingLeft: "15px",

              flex: ".5",
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            size chart
          </span>
        }
      </span>

      <SizeSelector
        availableSize={sizeAvailability}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flex: 1 }}>
          <PriceContainer
            id={id}
            productName={productName}
            gender={gender}
            ageGroup={ageGroup}
            price={price}
            discount={discount}
            maxStock={getMaxStock(selectedSize)}
            selectedSize={selectedSize}
            sellingPrice={price - (price * discount) / 100}
            thubnailImage={thubnailImage}
            description={description}
            usedForProductDetails={usedForProductDetails}
            showPrice={false}
          />
        </div>

        {/* {showSizeChart && (
          <span
            className={styles.productName}
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
              flex: 0.5,
              fontSize: "18px",
            }}
          >
            Size chart
          </span>
        )} */}
      </div>
    </div>
  );
};
const ThumbnailItemView = (props) => {
  const {
    id,
    productName,
    gender,
    ageGroup,
    price,
    discount,
    maxStock,
    thubnailImage,
    description,
  } = props;
  const theme = useTheme();

  return (
    <div className={styles.parentTumbnail}>
      <div className={styles.imageContainer}>
        <img src={thubnailImage} height={"100%"} width={"100%"} />
      </div>
      <InfoContainer {...props} />
    </div>
  );
};

export default ThumbnailItemView;
