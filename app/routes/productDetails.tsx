import StoreWrapper from "app/src/components/home/content/store/StoreWrapper";
import type { Route } from "./+types/home";
import ClientOnlyRender from "utils/ClientOnlyRender";
import { ToastProvider } from "utils/ToastProvider";
import { useParams } from "react-router";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function productDetails() {
    const { productId } = useParams();
    return <ClientOnlyRender> <div>{`product id ${productId}`}</div> <ToastProvider /></ClientOnlyRender>
    // <App />
}
