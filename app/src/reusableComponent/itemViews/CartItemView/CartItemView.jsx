import React from "react";
import { PriceContainer } from "../thumbnailItemView/ThumbnailItemView";
import { useSizeAvailability } from "../../../../../utils/useSizeAvailabilty";

const CartItemView = (props) => {
  const { productDetails } = props;
  const { sizeAvailability, selectedSize, setSelectedSize, getMaxStock } =
    useSizeAvailability(productDetails.id);

  return (
    <div
      style={{
        display: "flex",
        border: "1px solid black",
        height: "20vh",
        // width: "65vw",
      }}
    >
      <div
        style={{
          display: "flex",
          border: "1px solid black",
          flex: "0.2",
        }}
      >
        <img
          src={productDetails.thubnailImage}
          height={"100%"}
          width={"100%"}
        />
      </div>
      <div
        style={{
          display: "flex",
          border: "1px solid black",
          flex: "0.8",
          flexDirection: "column",
          paddingLeft: "5px",
        }}
      >
        <span>{productDetails.name}</span>
        <div
          style={{
            display: "flex",
          }}
        >
          <div>
            <span>Size: </span>
            <span>{productDetails.selectedSize}</span>
          </div>
          <div>
            <span>Quantity: </span> <span>{productDetails.quantity}</span>
          </div>
        </div>
        <PriceContainer
          id={productDetails.id}
          name={productDetails.name}
          gender={productDetails.gender}
          ageGroup={productDetails.ageGroup}
          price={productDetails?.price}
          discount={productDetails.discount}
          maxStock={getMaxStock(selectedSize)}
          selectedSize={productDetails.selectedSize}
          sellingPrice={
            productDetails.price -
            (productDetails.price * productDetails.discount) / 100
          }
          thubnailImage={productDetails.thubnailImage}
        />
        <span>
          Address bar with edit container on click open a dialog to saved
          address or new address
        </span>
      </div>
    </div>
  );
};

export default CartItemView;
