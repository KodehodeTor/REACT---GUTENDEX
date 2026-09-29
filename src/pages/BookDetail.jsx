import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function BookDetails() {
  // Destructure id, matching the placeholder in the route.
  const { id } = useParams();
  // Store fetched book object.
  const [book, setBook] = useState(null);
  // Loading and error states.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Creates a new controller object instance. Used to prevent outdated API request from continuing when no longer needed. An effort to speed up how slow Gutendex is. AbortController helps the user experience, by canceling irrelevant fetching.
    const controller = new AbortController();

    // Async function to fect a book from Gutendex.
    const fetchBook = async () => {
      // resets error states before fetching.
      setLoading(true);
      setError(null);
      try {
        // Request book details using ID from URL.
        const response = await fetch(`/api/books/${id}/`, {
          signal: controller.signal,
        });
        // Throws error if HTTP resposne failed
        if (!response.ok) {
          throw new Error(`HTTP error:${response.status}`);
        }
        // Check what type of data server has returned
        const contentType = response.headers.get("content-type");
        // Verify the type of data server returned JSON instead of other data.
        if (!contentType?.includes("application/json")) {
          throw new Error(
            `Expected JSON, received ${contentType} from ${response.url}`,
          );
        }
        //Convert the JSON response into a JS object:
        const data = await response.json();

        //Save book in React state
        setBook(data);
      } catch (err) {
        // Ignore aborterror when cancellation is intended.
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        // Stop loading if request wasnt aborted.
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    // Async fetch function
    fetchBook();
    // Cancel when components cancels or when book id changes.
    return () => controller.abort();
  }, [id]);

  // Display loading when fetching.
  if (loading) return <p>Loading details...</p>;
  // Error if fetching fails.
  if (error) return <p>Error: {error}</p>;
  // Shows message if no book data exists.
  if (!book) return <p>Book not found!</p>;

  return (
    <main>
      {/* Back to home navigation */}
      <Link to="/">Back to Books</Link>
      {/* Displays title and book cover from Gutendax format. */}
      <h1>{book.title}</h1>
      <img src={book.formats["image/jpeg"]} alt={`Cover of ${book.title}`} />
      {/* Map through authors, extract names and join them into a string - separated with comma and space. */}
      <p>Author: {book.authors.map((a) => a.name).join(", ") || "Uknown"}</p>
      {/* Shows download */}
      <p>Downloads: {book.download_count}</p>
      {/* Languages shown in a comma seperated string */}
      <p>Languages: {book.languages.join(", ")} </p>

      <h2>Subjects</h2>
      {/* Generates subjects list */}
      <ul>
        {book.subjects.map((subject) => (
          <li key={subject}>{subject}</li>
        ))}
      </ul>

      <h2>Available formats</h2>

      {/* !!!! */}
      <ul>
        {/* Converts the format objects into an array of format and url */}
        {Object.entries(book.formats)
          //Exlude image formats from downloadable format list.
          .filter(([format]) => !format.startsWith("image/"))
          // Generates a link for each remaining format.
          .map(([format, link]) => (
            <li key={format}>
              {/* Open the format in a new browser tab. */}
              <a href={link} target="_blank" rel="noopener noreferrer">
                {format}
              </a>
            </li>
          ))}
      </ul>
    </main>
  );
}
