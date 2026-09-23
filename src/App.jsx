import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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
