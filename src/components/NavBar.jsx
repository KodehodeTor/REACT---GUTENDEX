import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/books?topic=kategori">Kategori</Link>
      <Link to="/BookFavorites">BookFavs</Link>
      <Link to="/BookDetail">BookDetail</Link>
    </nav>
  );
}
