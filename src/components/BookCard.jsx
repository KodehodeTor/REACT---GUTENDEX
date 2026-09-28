import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function BookCard({ book }) {
  const cover = book.formats["image/jpeg"];
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(book.id);

  return (
    <Link to={`/books/${book.id}`}>
      <article style={styles.card}>
        {cover && (
          <img
            src={cover}
            alt={`Cover of ${book.title}`}
            style={styles.cover}
          />
        )}

        <h3>{book.title}</h3>
        <p>
          Author: {book.authors.map((a) => a.name).join(", ") || "Unknwon"}{" "}
        </p>
        <span>Downloads:{book.download_count}</span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(book);
          }}
        >
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
    padding: "20x",
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
