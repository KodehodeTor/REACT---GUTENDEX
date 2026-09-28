import { useState, useEffect } from "react";
import { FavoritesContext } from "./FavoritesContext.jsx";

export default function FavoritesProvider({ children }) {
  //State
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  //Add or remove favorites
  const toggleFavorite = (book) => {
    setFavorites((prev) => {
      const alreadyFavorite = prev.some((item) => item.id === book.id);

      if (alreadyFavorite) {
        return prev.filter((item) => item.id !== book.id);
      }
      return [...prev, book];
    });
  };

  //Check if book is a favorite
  const isFavorite = (id) => {
    return favorites.some((book) => book.id === id);
  };

  //provides values to App
  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
