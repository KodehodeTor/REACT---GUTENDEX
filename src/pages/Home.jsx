import { useState } from "react";
import useFetchBook from "../hooks/useFetchBook.jsx";
import CategoryMenu from "../components/CategoryMenu.jsx";

export default function Home() {
  // States; input stores whats typed - Term stores the confirmed search to Gutendex.
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // Stores URL of the page we are viewing:
  const [pageUrl, setPageUrl] = useState(null);
  // Select catagory state
  const [selectedCatagory, setSelectedCategory] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPageUrl(null);
  };

  //Build API parameters:
  const params = new URLSearchParams();

  // Add search term if one exist
  if (searchTerm) {
    params.set("search", searchTerm);
  }

  //Add category if there is one:
  if (selectedCatagory) {
    params.set("topic", selectedCatagory);
  }

  //Construct the URL
  const searchUrl = `/api/books/?${params.toString()}`;

  //Use pagination URL if available, if not use search URL.
  const url = pageUrl || searchUrl;

  const { books, loading, error, next, previous } = useFetchBook(url);

  // Copies the current input into the confirmed state.
  const handleSearch = (e) => {
    // Prevents the form from reloading page.
    e.preventDefault();
    // Every page starts on page 1
    setPageUrl(null);
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

      {searchTerm && <p>Showing results for: {searchTerm}</p>}
      {loading && <p>Searching Gutendex, please wait...</p>}
      {error && <p>Error: {error}</p>}

      <CategoryMenu
        selectedCatagory={selectedCatagory}
        categoryChange={handleCategoryChange}
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

      <div className="pagination">
        <button
          onClick={() => setPageUrl(previous)}
          disabled={!previous || loading}
        >
          Previous
        </button>

        <button onClick={() => setPageUrl(next)} diabled={!next || loading}>
          Next
        </button>
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
