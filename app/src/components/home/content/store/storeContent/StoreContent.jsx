import React from "react";
import ThumbnailItemView from "../../../../../reusableComponent/itemViews/thumbnailItemView/ThumbnailItemView";
import { FEATUREDPRODUCT } from "../../../../../assets/payload/FEATURED-PRODUCT";

function StoreContent() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        // gridTemplateColumns: "repeat",
        gap: "16px", // spacing between grid items
        width: "100%",
      }}
    >
      {FEATUREDPRODUCT.map((item, idx) => {
        return (
          <ThumbnailItemView
            key={idx}
            id={item.id}
            name={item.productName}
            gender={item.gender}
            ageGroup={item.ageGroup}
            price={item.price}
            discount={item.discount}
            maxStock={item.maxorderCount}
            sizeAvailabilibity={item.availableSize}
          />
        );
      })}
    </div>
  );
}

export default StoreContent;
