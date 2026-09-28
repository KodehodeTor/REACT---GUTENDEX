import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function NavBar() {
  const { favorites } = useFavorites();
  return (
    <nav>
      <Link to="/">
        Home <br></br>{" "}
      </Link>
      <Link to="/favorites">Favorites: ({favorites.length})</Link>
    </nav>
  );
}
