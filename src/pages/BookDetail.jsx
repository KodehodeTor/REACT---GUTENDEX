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
        const response = await fetch(`/api/books/${id}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch details");
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    fetchBook();
    return () => controller.abort();
  }, [id]);

  if (loading) return <p>Loading details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>Book not found!</p>;

  return (
    <main>
      <Link to="/">Back to Books</Link>
      <h1>{book.title}</h1>

      <img src={book.formats["image/jpeg"]} alt={`Cover of ${book.title}`} />

      <p>Author: {book.authors.map((a) => a.name).join(", ") || "Uknown"}</p>

      <p>Downloads: {book.download_count}</p>

      <p>Languages: {book.languages.join(", ")} </p>

      <h2>Subjects</h2>

      <ul>
        {book.subjects.map((subject) => (
          <li key={subject}>{subject}</li>
        ))}
      </ul>

      <h2>Available formats</h2>

      <ul>
        {Object.entries(book.formats)
          .filter(([format]) => !format.startsWith("image/"))
          .map(([format, link]) => (
            <li key={format}>
              <a href={link} target="_blank" rel="noopner noreferrer">
                {format}
              </a>
            </li>
          ))}
      </ul>
    </main>
  );
}
