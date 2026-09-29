import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function NavBar() {
  // Favorite object from FavoritesContext.
  const { favorites } = useFavorites();
  return (
    <nav>
      {/* Homepage. */}
      <Link to="/">
        Home <br></br>{" "}
      </Link>
      {/* Favorites and displays the total saved favorites. */}
      <Link to="/favorites">Favorites: ({favorites.length})</Link>
    </nav>
  );
}
