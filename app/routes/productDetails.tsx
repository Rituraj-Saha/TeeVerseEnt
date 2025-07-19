import StoreWrapper from "app/src/components/home/content/store/StoreWrapper";
import type { Route } from "./+types/home";
import ClientOnlyRender from "utils/ClientOnlyRender";
import { ToastProvider } from "utils/ToastProvider";
import { useParams } from "react-router";
import { useState } from "react";
import { FEATUREDPRODUCT } from "app/src/assets/payload/FEATURED-PRODUCT";
import { InfoContainer } from "app/src/reusableComponent/itemViews/thumbnailItemView/ThumbnailItemView";


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
}
const ProductGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            flex: .6,
            border: "1px solid red"
        }}>
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
}
export default function productDetails() {
    const { productId } = useParams();
    const product = FEATUREDPRODUCT.find((item) => item.id == productId)
    const handleAddToCart = () => {
        console.log("Add to cart clicked");
        // Dispatch Redux action or call API here
    };
    return <ClientOnlyRender>

        <div style={{ display: "flex", border: "1px solid black", height: "92vh", width: "100vw", flexDirection: "column", paddingInline: "50px" }}>
            <div style={{ display: "flex", height: "70%", width: "100%" }}>
                <ProductGallery images={product.images} />
                {/* <ProductDetails product={product} onAddToCart={handleAddToCart} /> */}
                <div style={{ display: "flex", flexDirection: "column", flex: ".5" }}>
                    <div style={{ display: "flex", flexDirection: "column", flex: ".6" }}>

                        <InfoContainer {...product} showDescription={true} showViewproduct={false} usedForProductDetails={true} />
                    </div>
                </div>


            </div>

        </div>
        <ToastProvider />
    </ClientOnlyRender>
    // <App />
}
