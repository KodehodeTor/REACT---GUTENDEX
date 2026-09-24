import { useState, useEffect } from "react";
import useFetchBook from "./hooks/useFetchBook.jsx";
// import BookDetails from "./pages/BookDetail.jsx";
// import BookFavorites from "./pages/BookFavorites.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  const [searchItem, setSearchItem] = useState(``);
  //Pagination
  const [page, setPage] = useState(1);
  const url = `https://gutendex.com/books/?page=${page}`;

  const { books, loading, error, next, previous } = useFetchBook(url);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };

  //Page handler:
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setPage((prev) => prev - 1);
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
      <div>
        <button onClick={handlePrevious} disabled={!previous}>
          Previous
        </button>
        <span>page {page}</span>
        <button onClick={handleNext} disabled={!next}>
          Next
        </button>
      </div>
    </div>
  );
}
