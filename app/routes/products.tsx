import StoreWrapper from "app/src/components/home/content/store/StoreWrapper";
import type { Route } from "./+types/home";
import ClientOnlyRender from "utils/ClientOnlyRender";
import { ToastProvider } from "utils/ToastProvider";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function products() {
    return <ClientOnlyRender> <div><StoreWrapper /></div> <ToastProvider /></ClientOnlyRender>
    // <App />
}
