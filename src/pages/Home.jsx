import { useState } from "react";
import useFetchBook from "../hooks/useFetchBook";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const url = searchTerm
    ? `https://gutendex.com/books/?search=${encodeURIComponent(searchTerm)}`
    : "https://gutendex.com/books/";

  const { books, loading, error, next, previous } = useFetchBook(url);

  return (
    <main>
      <input
        className="SearchBar"
        type="search"
        placeholder="Seach book or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div style={styles.grid}>
        {books.map((book) => (
          <article key={book.id} style={styles.card}>
            <h3>{book.title}</h3>
            <p>
              Author: {book.authors.map((a) => a.name).join(", ") || "Unknown"}
            </p>
            <span> Downloads: {book.download_count}</span>
          </article>
        ))}
      </div>
    </main>
  );
}

const styles = {
  grid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  },
  card: { border: "1px solid #ccc", padding: "15px", borderRadius: "8px" },
};
