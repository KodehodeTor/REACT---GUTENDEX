export default function Home({ books }) {
  return (
    <main style={styles.grid}>
      {books.map((book) => (
        <article key={book.id} style={styles.card}>
          <h3>{book.title}</h3>
          <p>
            Author: {book.authors.map((a) => a.name).join(", ") || "Unknown"}
          </p>
          <span> Downloads: {book.download_count}</span>
        </article>
      ))}
    </main>
  );
}

const styles = {
  grid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  },
  card: { border: "1px solid #ccc", padding: "15px", borderRadius: "8px" },
};
