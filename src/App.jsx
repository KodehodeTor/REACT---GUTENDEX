import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState(``);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };

  useEffect(() => {
    fetch("https://gutendex.com/books/")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.results);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading books...</div>;

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
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.authors.map((a) => a.name).join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
