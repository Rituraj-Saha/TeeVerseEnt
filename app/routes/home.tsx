import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import App from "../src/App";
import ClientOnlyRender from "utils/ClientOnlyRender";
import { ToastProvider } from "utils/ToastProvider";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <ClientOnlyRender> <App /> <ToastProvider /></ClientOnlyRender>
  // <App />
}
