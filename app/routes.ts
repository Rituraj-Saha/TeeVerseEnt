import { type RouteConfig, index, route } from "@react-router/dev/routes";
const appname = import.meta.env.APP_NAME;
console.log(appname);
export default [
  //   index("routes/home.tsx"),
  route(`${"/dev"}`, "routes/home.tsx"),
] satisfies RouteConfig;
