declare module "*.jsx" {
  import { FunctionComponent } from "react";
  const component: FunctionComponent<any>;
  export default component;
}
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
