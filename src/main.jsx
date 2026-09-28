import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./routes/index.jsx";
import { RouterProvider } from "react-router-dom";
import FavoritesProvider from "./context/FavoritesProvider.jsx";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  </StrictMode>,
);
