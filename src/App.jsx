import { useState, useEffect } from "react";

const [searchItem, setSearchItem] = useState(``);
const handleInputChange = (e) => {
  const searchTerm = e.target.value;
  setSearchItem(searchTerm);
};

if (loading) return <div>Loading books...</div>;

function App() {
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
