import { useState } from "react";
import useFetchBook from "../hooks/useFetchBook.jsx";
import CategoryMenu from "../components/CategoryMenu.jsx";
import BookCard from "../components/BookCard.jsx";

export default function Home() {
  // States; input stores whats typed - Term stores the confirmed search to Gutendex.
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // Stores URL of the page we are viewing:
  const [pageUrl, setPageUrl] = useState(null);
  // Select catagory state
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPageUrl(null);
  };

  //Build API parameters. Used to construct the search URL based for searches and category selected. Instead of manually constructing a query string (example:"?search=tolkien&topic=fiction") we use URLSearchParams handle it.
  const params = new URLSearchParams();

  // Add search term if one exist
  if (searchTerm) {
    params.set("search", searchTerm);
  }

  //Add category if there is one:
  if (selectedCategory) {
    params.set("topic", selectedCategory);
  }

  //Construct the URL
  const searchUrl = `/api/books/?${params.toString()}`;

  //Use pagination URL if available, if not use search URL.
  const url = pageUrl || searchUrl;
  // Destructure book data, loading, error states and pagination URLs.
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
      {/* Search form */}
      <form onSubmit={handleSearch}>
        <input
          className="SearchBar"
          type="search"
          placeholder="Search book or author"
          // Controlled input using state.
          value={searchInput}
          // Update input whenever user types (changed eventually to click button on search due to Gutendex being slow...)
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {/* Submit search form */}
        <button type="submit">Search</button>
      </form>
      {/* Display the search term if one exists. */}
      {searchTerm && <p>Showing results for: {searchTerm}</p>}
      {/* Display loading and error messages */}
      {loading && <p>Searching Gutendex, please wait...</p>}
      {error && <p>Error: {error}</p>}

      {/* pass selected category and change handler as props */}
      <CategoryMenu
        selectedCategory={selectedCategory}
        categoryChange={handleCategoryChange}
      />
      {/* Display fetched books */}
      <div style={styles.grid}>
        {/* Map through books and render BookCard for each book. */}
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      {/* Pagination controls */}
      <div className="pagination">
        <button
          // Navigate to previous page.
          onClick={() => setPageUrl(previous)}
          // Disable if no previous page exists or data is loading.
          disabled={!previous || loading}
        >
          Previous
        </button>
        {/* Navigate to the next page / / Disable if no next page exists or data is loading. */}
        <button onClick={() => setPageUrl(next)} disabled={!next || loading}>
          Next
        </button>
      </div>
    </main>
  );
}
// Inline styling
const styles = {
  grid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  },
  card: { border: "1px solid #ccc", padding: "15px", borderRadius: "8px" },
};
