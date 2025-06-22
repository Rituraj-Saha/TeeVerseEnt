import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

import ClientOnlyRender from "utils/ClientOnlyRender";
import { ToastProvider } from "utils/ToastProvider";
import LandingHome from "app/src/components/home/LandingHome";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "TeesVesrse" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  // return <ClientOnlyRender> <Appx /> </ClientOnlyRender>
  return <ClientOnlyRender><LandingHome /><ToastProvider /></ClientOnlyRender>;
  // <App />
}
