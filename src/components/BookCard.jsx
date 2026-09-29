import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function BookCard({ book }) {
  //Cover image format
  const cover = book.formats["image/jpeg"];
  //Get favorites function from context.
  const { toggleFavorite, isFavorite } = useFavorites();
  //Check if the current book is favorite.
  const favorite = isFavorite(book.id);

  return (
    //Directs to books detail page when clicking a card.
    <Link to={`/books/${book.id}`}>
      <article style={styles.card}>
        {/* Display cover if it exists. */}
        {cover && (
          <img
            src={cover}
            alt={`Cover of ${book.title}`}
            style={styles.cover}
          />
        )}
        {/* Book title */}
        <h3>{book.title}</h3>
        <p>
          {/* Maps through authors, extract names and joins them into a string. Seperate with a comma and space */}
          Author: {book.authors.map((a) => a.name).join(", ") || "Unknown"}{" "}
        </p>
        {/* Number of downloads. */}
        <span>Downloads:{book.download_count}</span>
        {/* Add or remove a favorite. */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(book);
          }}
        >
          {/* Changes button text from add to fav to remove. */}
          {favorite ? "Remove from favorites" : "Add to favorites"}
        </button>
      </article>
    </Link>
  );
}
// Inline styling
const styles = {
  card: {
    backgroundColor: "#363c45",
    color: "whitesmoke",
    border: "1px solid #374151",
    padding: "20px",
    borderRadius: "12px",
    boxShadow:
      "0 6px 20px rgba(0,0,0,0.25), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
  },
  cover: {
    width: "100%",
    height: "250px",
    objectFit: "contain",
    borderRadius: "6px",
  },
};
