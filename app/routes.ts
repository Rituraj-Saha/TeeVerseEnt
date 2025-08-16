import { loadEnv } from "vite";
import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

// Load env manually — simulate Vite behavior
const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
const base = env.VITE_BASE_PATH || "";

function withBase(path: string) {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\/+/, "")}`;
}

// export default [
//   route(withBase(""), "routes/home.tsx"),
//   route(withBase("/products"), "routes/products.tsx"),
// ] satisfies RouteConfig;

export default [
  layout("routes/rootLayout.jsx", [
    route(withBase(""), "routes/home.tsx"), // /dev/
    route(withBase("products"), "routes/products.tsx"), // /dev/products
    route(withBase("/orders"), "routes/orders.tsx"), // /dev/orders
    route(withBase("products/:productId"), "routes/productDetails.tsx"),
  ]),
] satisfies RouteConfig;
