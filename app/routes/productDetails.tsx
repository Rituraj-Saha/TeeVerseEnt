import StoreWrapper from "app/src/components/home/content/store/StoreWrapper";
// import type { Route } from "./+types/home";
import ClientOnlyRender from "utils/ClientOnlyRender";
import { ToastProvider } from "utils/ToastProvider";
import { useParams } from "react-router";
import React, { Suspense, useState } from "react";
import { FEATUREDPRODUCT } from "app/src/assets/payload/FEATURED-PRODUCT";
import { InfoContainer } from "app/src/reusableComponent/itemViews/thumbnailItemView/ThumbnailItemView";
import UserLocationMap from "app/src/reusableComponent/mapComponent/LocationComponent";
import CaroualImpl from "app/src/reusableComponent/carousal/Carousel";
import BannerMid from "app/src/components/home/content/banners/bannerMid/BannerMid";
import BannerTop from "app/src/components/home/content/banners/bannerTop/BannerTop";



export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
const ProductDetails = ({ product, onAddToCart }) => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">{product.title}</h1>
      <p className="text-lg text-green-700 font-bold">₹{product.price}</p>
      <p className="text-gray-700">{product.description}</p>
      <button
        onClick={onAddToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};
const ProductGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flex: 0.6,
        border: "1px solid red",
      }}
    >
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-[400px]">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx}`}
            className={`w-20 h-20 object-cover rounded cursor-pointer border ${img === selectedImage ? "border-blue-500" : "border-gray-200"
              }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img
          src={selectedImage}
          alt="Selected"
          className="max-w-full h-[100%] object-contain rounded shadow"
        />
      </div>
    </div>
  );
};
const items = [
  <div style={{ height: "100%", border: "1px solid black", width: "100%" }}>
    Slide 1
  </div>,
  <div style={{ height: "100%", border: "1px solid black", width: "100%" }}>
    Slide 2
  </div>,
  <div style={{ height: "100%", border: "1px solid black", width: "100%" }}>
    Slide 3
  </div>,
];
export default function productDetails() {
  const { productId } = useParams();
  const product = FEATUREDPRODUCT.find((item) => item.id == productId);
  const handleAddToCart = () => {
    console.log("Add to cart clicked");
    // Dispatch Redux action or call API here
  };
  return (
    <ClientOnlyRender>
      <div
        style={{
          display: "flex",
          border: "1px solid black",
          height: "92vh",
          width: "100vw",
          flexDirection: "column",
          paddingInline: "50px",
        }}
      >
        <div style={{ display: "flex", height: "100%", width: "100%", gap: "25px" }}>

          <ProductGallery images={product.images} />

          {/* <ProductDetails product={product} onAddToCart={handleAddToCart} /> */}
          <div style={{ display: "flex", flexDirection: "column", flex: .5, gap: "15px" }}>
            <div
              style={{ display: "flex", flexDirection: "column", flex: .4, paddingRight: "15vw" }}
            >
              <InfoContainer
                {...product}
                showDescription={true}
                showViewproduct={false}
                usedForProductDetails={true}

              />
            </div>
            <div style={{ display: "flex", width: "100%", flex: ".2", border: "1px solid black" }}>

              banner
            </div>
            <span>Rating & Reviews</span>
            <div style={{ display: "flex", flexDirection: "column", flex: ".6", padding: "25px" }}>
              <CaroualImpl items={items} timer={7000} />
            </div>
          </div>

        </div>
        {/* <UserLocationMap /> */}
      </div>
      <ToastProvider />
    </ClientOnlyRender >
  );
  // <App />
}
