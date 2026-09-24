import { useState, useEffect } from "react";

export default function useFetchBook(url = "https://gutendex.com/books/") {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.results);
        setNext(data.next);
        setPrevious(data.previous);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { books, loading, error, next, previous };
}
