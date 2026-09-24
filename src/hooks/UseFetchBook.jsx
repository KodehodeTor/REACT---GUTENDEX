import { useState, useEffect } from "react";

//Cache for loading issues:
const bookCache = new Map();

export default function useFetchBook(url = "https://gutendex.com/books/") {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    //If cached data
    if (bookCache.has(url)) {
      const data = bookCache.get(url);

      setBooks(data.results);
      setNext(data.next);
      setPrevious(data.previous);
      setLoading(false);
      setError(null);

      return;
    }
    //If no cached data
    setLoading(true);
    setError(null);
    fetch(url)
      .then((res) => {
        return res.json();
      })
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
