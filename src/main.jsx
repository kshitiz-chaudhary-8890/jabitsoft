import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SmoothScrollProvider } from "./components/providers/SmoothScrollProvider";
import "lenis/dist/lenis.css";
import "./styles.css";
import "./styles/section-heading-fill.css";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <SmoothScrollProvider>
      <App />
    </SmoothScrollProvider>
  </StrictMode>,
);
