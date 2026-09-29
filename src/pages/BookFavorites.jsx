import { useFavorites } from "../context/FavoritesContext.jsx";
import BookCard from "../components/BookCard.jsx";

export default function BookFavorites() {
  // Get favorite array from context.
  const { favorites } = useFavorites();

  return (
    <main>
      <h1>My favorites</h1>
      {/* Check if the favorite array is empty */}
      {favorites.length === 0 ? (
        // If empty:
        <p>No favorites added yet.</p>
      ) : (
        // Displays saved books if favorites exist.
        <div className="bookGrid">
          {favorites.map((book) => (
            // Use book id as key and pass the book object as a prop.
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}
