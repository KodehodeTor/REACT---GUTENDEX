import { useState } from "react";
import useFetchBook from "../hooks/useFetchBook";

export default function Home() {
  // States; input stores whats typed - Term stores the confirmed search to Gutendex.
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const url = searchTerm
    ? `/api/books/?search=${encodeURIComponent(searchTerm)}`
    : `/api/books/`;

  const { books, loading, error, next, previous } = useFetchBook(url);

  // Copies the current input into the confirmed state.
  const handleSearch = (e) => {
    // Prevents the form from reloading page.
    e.preventDefault();
    setSearchTerm(searchInput.trim());
  };

  return (
    <main>
      <form onSubmit={handleSearch}>
        <input
          className="SearchBar"
          type="search"
          placeholder="Seach book or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>
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
