import React, { useEffect } from "react";
import ThumbnailItemView from "../../../../../reusableComponent/itemViews/thumbnailItemView/ThumbnailItemView";
import { FEATUREDPRODUCT } from "../../../../../assets/payload/FEATURED-PRODUCT";
import { useGetProductsQuery } from "app/storeCofig/apiServices/productsApi";

function StoreContent(props) {
  const { numColumns = 3 } = props;
  const mapProduct = (apiProduct) => ({
    id: apiProduct.id,
    productName: apiProduct.name,
    description: apiProduct.description,
    thubnailImage: apiProduct.thumbnail.replace(
      "app/",
      "http://localhost:8000/"
    ),
    images: apiProduct.images || [],
    availableSize: apiProduct.sizes
      ? apiProduct.sizes.filter((s) => s.stock > 0).map((s) => s.size)
      : [],
    price: Number(apiProduct.price),
    discount: apiProduct.discount,
    maxDiscount: apiProduct.max_discount,
    discountAvailable: apiProduct.discount > 0,
    maxorderCount: apiProduct.max_order_count,
    ageGroup: apiProduct.age_group,
    gender: apiProduct.gender,
  });
  const { data, error, isLoading } = useGetProductsQuery({
    skip: 0,
    limit: 10,
  });
  useEffect(() => {
    !isLoading && console.log("product data: ", data);
  }, [isLoading]);
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
        gap: "15px",
        width: "100%",
      }}
    >
      {isLoading ? (
        <>loading</>
      ) : (
        <>
          {data.map((item, idx) => {
            const product = mapProduct(item);
            console.log("av size: ", product.availableSize);
            return <ThumbnailItemView key={product.id} {...product} />;
          })}
        </>
      )}
    </div>
  );
}

export default StoreContent;
