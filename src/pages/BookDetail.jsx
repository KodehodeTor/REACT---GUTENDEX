import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function BookDetails() {
  // Destructure id, matching the placeholder in the route.
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Creates a new controller object instance
    const controller = new AbortController();

    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch (`/api/books/${id}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch details");
        }
        const data = await response.json();
        setBook(data)
      } catch (err) {
        if(err.name !== "AbortError") {
          setError(err.message):
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    feckBook();
    return () => controller.abort();
  }, [id]);

  if (loading) return <p>Loading details...</p>
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>Book not found!</p>

  return <div>BookDetails</div>;
}
