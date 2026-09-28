import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  const cover = book.formats["image/jpeg"];

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
      </article>
    </Link>
  );
}
const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "8px",
  },
  cover: {
    width: "100%",
    height: "250px",
    objectFit: "contain",
  },
};
