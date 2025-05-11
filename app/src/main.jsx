import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
//can be removed the whole file
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
