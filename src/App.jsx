import { useState, useEffect } from "react";
import useFetchBook from "./hooks/useFetchBook.jsx";
// import BookDetails from "./pages/BookDetail.jsx";
// import BookFavorites from "./pages/BookFavorites.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  const [searchItem, setSearchItem] = useState(``);
  const { books, loading, error } = useFetchBook();

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };

  //Filter books down based on the user type in search bar
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchItem.toLowerCase()),
  );

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app">
      <h1>Project Gutendex</h1>
      <div>
        <input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder="Type to search"
        />
      </div>
      <Home books={filteredBooks} />
    </div>
  );
}
