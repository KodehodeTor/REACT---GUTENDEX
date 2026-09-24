import { useState, useEffect } from "react";

export default function useFetchBook(url = "https://gutendex.com") {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://gutendex.com/books/")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { books, loading, error };
}
