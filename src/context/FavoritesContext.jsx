import { createContext, useContext } from "react";
// Context to share favorite data between components.
export const FavoritesContext = createContext(null);

// Hook to access FavoritesContext.
export const useFavorites = () => {
  // Current context value.
  const context = useContext(FavoritesContext);
  // Throws an error if hook is used outside of FavoritesProvider.
  if (!context) {
    throw new Error("Favorites not inside FavoritesProvider");
  }
  // Returns context data to components using the hook
  return context;
};
