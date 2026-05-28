import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FitnessPlan from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FitnessPlan />
  </StrictMode>
);
