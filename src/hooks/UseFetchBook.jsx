import { useState, useEffect } from "react";

// Converts Gutendex URLs to our Vite proxy URLs
const toProxyUrl = (url) => {
  if (!url) return null;

  return url.replace("https://gutendex.com", "/api");
};

//Cache for loading issues. Creates a new map
const bookCache = new Map();

export default function useFetchBook(url = "/api/books/") {
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
        if (!res.ok) {
          throw new Error(`HTTP: error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        //Converts pagination URLs (next & previous)
        const normalData = {
          ...data,
          next: toProxyUrl(data.next),
          previous: toProxyUrl(data.previous),
        };

        //Save converted data to cache:
        bookCache.set(url, normalData);

        setBooks(normalData.results);
        setNext(normalData.next);
        setPrevious(normalData.previous);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { books, loading, error, next, previous };
}
