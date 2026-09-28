import { useFavorites } from "../context/FavoritesContext.jsx";
import BookCard from "../components/BookCard.jsx";

export default function BookFavorites() {
  const { favorites } = useFavorites();

  return (
    <main>
      <h1>My favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="bookGrid">
          {favorites.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}
