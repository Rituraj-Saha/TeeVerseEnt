import StoreWrapper from "app/src/components/home/content/store/StoreWrapper";
import type { Route } from "./+types/home";
import ClientOnlyRender from "utils/ClientOnlyRender";
import { ToastProvider } from "utils/ToastProvider";
import { useParams } from "react-router";
import { useState } from "react";
import { FEATUREDPRODUCT } from "app/src/assets/payload/FEATURED-PRODUCT";


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
        <div className="flex flex-col md:flex-row gap-4">
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
                    className="max-w-full max-h-[500px] object-contain rounded shadow"
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

        <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-6">
            <ProductGallery images={product.images} />
            <ProductDetails product={product} onAddToCart={handleAddToCart} />

        </div>
        <ToastProvider />
    </ClientOnlyRender>
    // <App />
}
