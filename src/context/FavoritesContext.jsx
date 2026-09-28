import { createContext, useContext } from "react";

export const FavoritesContext = createContext(null);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("Favorites not inside FavoritesProvider");
  }
  return context;
};
