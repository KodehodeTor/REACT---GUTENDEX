import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BookDetails from "../pages/BookDetail.jsx";
import BookFavorites from "../pages/BookFavorites.jsx";
import Home from "../pages/Home.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "books/:id",
        element: <BookDetails />,
      },
      {
        path: "favorites",
        element: <BookFavorites />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404</h1>,
  },
]);
