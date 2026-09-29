import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./routes/index.jsx";
import { RouterProvider } from "react-router-dom";
import FavoritesProvider from "./context/FavoritesProvider.jsx";
import "./styles/global.css";

// Finds the root element in index.html and implements REACT.
createRoot(document.getElementById("root")).render(
  // StrictMode
  <StrictMode>
    {/* Wraps App in FavoritesProvider, makes favorite state and functions available in app. */}
    <FavoritesProvider>
      {/* Handles navigation and renders the matching components. */}
      <RouterProvider router={router} />
    </FavoritesProvider>
  </StrictMode>,
);
