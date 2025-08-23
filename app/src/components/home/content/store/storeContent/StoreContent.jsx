import React, { useEffect } from "react";
import ThumbnailItemView from "../../../../../reusableComponent/itemViews/thumbnailItemView/ThumbnailItemView";
import { FEATUREDPRODUCT } from "../../../../../assets/payload/FEATURED-PRODUCT";
import { useGetProductsQuery } from "app/storeCofig/apiServices/productsApi";
export const mapProduct = (apiProduct) => ({
  id: apiProduct.id,
  productName: apiProduct.name,
  description: apiProduct.description,
  thubnailImage: apiProduct.thumbnail.replace("app/", "http://localhost:8000/"),
  images: apiProduct.images || [],
  availableSize: apiProduct.sizes,
  // ? apiProduct.sizes.filter((s) => s.stock > 0).map((s) => s.size)
  // : [],
  price: Number(apiProduct.price),
  discount: apiProduct.discount,
  maxDiscount: apiProduct.max_discount,
  discountAvailable: apiProduct.discount > 0,
  maxorderCount: apiProduct.max_order_count,
  ageGroup: apiProduct.age_group,
  gender: apiProduct.gender,
});
function StoreContent(props) {
  const { numColumns = 3, currentPage = 1 } = props;

  const { data, error, isLoading } = useGetProductsQuery({
    skip: currentPage == 1 ? 0 : (currentPage - 1) * 12,
    limit: 12,
  });
  useEffect(() => {
    !isLoading && console.log("product data: ", data);
  }, [isLoading]);
  return (
    <div
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
            return <ThumbnailItemView key={product.id} {...product} />;
          })}
        </>
      )}
    </div>
  );
}

export default StoreContent;
