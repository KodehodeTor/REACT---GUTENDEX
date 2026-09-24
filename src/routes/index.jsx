import { createBrowserRouter } from "react-router-dom";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        // element: <Home/>
      },
      {
        path: "books",
        // element: <Books />
      },
      {
        path: "books/:id",
        // element: <BookDetails />
      },
      {
        path: "favorites",
        // element: <BookFavorites />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404</h1>,
  },
]);

export { router };
