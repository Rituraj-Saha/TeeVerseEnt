import React from "react";
import ThumbnailItemView from "../../../../../reusableComponent/itemViews/thumbnailItemView/ThumbnailItemView";
import { FEATUREDPRODUCT } from "../../../../../assets/payload/FEATURED-PRODUCT";
import { PRODUCT_AVAILABILITY_MATRIX } from "app/src/assets/payload/ProductAvailabilityChecker";
import sampleImageView from "../../../../../assets/samplebgremove.png";
const availableSize = (id) => {
  const product = PRODUCT_AVAILABILITY_MATRIX.find((p) => p.id === id);
  if (!product) return [];
  return product.availability.filter((item) => Number(item.available) > 0);
};
function StoreContent(props) {
  const { numColumns = 3 } = props;
  return (
    <div
      // style={{
      //   display: "flex",
      //   flexWrap: "wrap",
      //   alignItems: "center",
      //   justifyContent: "center",
      //   // gridTemplateColumns: "repeat",
      //   gap: "16px", // spacing between grid items
      //   width: "100%",
      // }}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
        gap: "5px",
        width: "100%",
      }}
    >
      {FEATUREDPRODUCT.map((item, idx) => {
        return (
          <ThumbnailItemView
            key={idx}
            // id={item.id}
            // name={item.productName}
            // gender={item.gender}
            // ageGroup={item.ageGroup}
            // price={item.price}
            // discount={item.discount}
            // // maxStock={item.maxorderCount}
            // // sizeAvailabilibity={availableSize(item.id)}
            // thubnailImage={sampleImageView}
            {...item}
          />
        );
      })}
    </div>
  );
}

export default StoreContent;
