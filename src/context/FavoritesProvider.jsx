import { useState, useEffect } from "react";
import { FavoritesContext } from "./FavoritesContext.jsx";

export default function FavoritesProvider({ children }) {
  //State for storing favorites.
  const [favorites, setFavorites] = useState(() => {
    //Gets previously saved favorites.
    const savedFavorites = localStorage.getItem("favorites");
    // Parse saved JSON in array or use an empty array if not available.
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  // Save to localStorage when array changes.
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  //Add or remove favorites
  const toggleFavorite = (book) => {
    setFavorites((prev) => {
      // Check if book is in favorite array.
      const alreadyFavorite = prev.some((item) => item.id === book.id);
      // If already in favorites, remove book by using id.
      if (alreadyFavorite) {
        return prev.filter((item) => item.id !== book.id);
      }
      // If not, add book to existing favorite array.
      return [...prev, book];
    });
  };

  //Returns true if book is matching id, othervise false.
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
