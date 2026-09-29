import { useState, useEffect } from "react";

// Converts Gutendex URLs to our Vite proxy URLs
const toProxyUrl = (url) => {
  // returns null if no URL exsist.
  if (!url) return null;
  // Dosn't fetch from internet, parses and responsves an adress, giving us an object which properties can be used to construct custom URLs.
  const parsedUrl = new URL(url, "https://gutendex.com");
  // Example to note over: if console.log(parsedUrl.pathname) we would get /books/

  // Replaces Gutendex domain with local /api proxy. Perserve orginal path and query string.
  return `/api${parsedUrl.pathname}${parsedUrl.search}`;
};

//Cache for loading issues. Creates a new map. Its outside of the hook so cache can be between component renders.
const bookCache = new Map();

export default function useFetchBook(url = "/api/books/") {
  // Store fetched book
  const [books, setBooks] = useState([]);
  // Track if data is loading.
  const [loading, setLoading] = useState(true);
  // Store errors
  const [error, setError] = useState(null);
  // Store pagnation URLs
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    //If cached data
    if (bookCache.has(url)) {
      // Retrive cached data
      const data = bookCache.get(url);

      // Update state using cached data instead of fetching again.
      setBooks(data.results);
      setNext(data.next);
      setPrevious(data.previous);
      setLoading(false);
      setError(null);

      return;
    }
    //If no cached data, start new fetch.
    setLoading(true);
    setError(null);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          // Throw error if HTTP response failed
          throw new Error(`HTTP: error: ${res.status}`);
        }
        // Convert response from JSON into JS string.
        return res.json();
      })
      .then((data) => {
        //Converts pagination URLs (next & previous)
        const normalData = {
          ...data,
          // Replaces orginal pagination URL with proxy URLs.
          next: toProxyUrl(data.next),
          previous: toProxyUrl(data.previous),
        };

        //Save converted data to cache:
        bookCache.set(url, normalData);

        // Update state with book data and pagination URLs.
        setBooks(normalData.results);
        setNext(normalData.next);
        setPrevious(normalData.previous);
        setLoading(false);
      })
      .catch((err) => {
        // Error message if fetching fails.
        setError(err.message);
        // Stop loading if error.
        setLoading(false);
      });
  }, [url]);
  // Share book data, loading status, error and pagination to components.
  return { books, loading, error, next, previous };
}
