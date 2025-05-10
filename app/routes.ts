import { loadEnv } from "vite";
import { type RouteConfig, route } from "@react-router/dev/routes";

// Load env manually — simulate Vite behavior
const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
const base = env.VITE_BASE_PATH || "";

function withBase(path: string) {
  return `${base}${path}`;
}

export default [route(withBase("/"), "routes/home.tsx")] satisfies RouteConfig;
