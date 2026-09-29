import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";

export default function App() {
  return (
    // Main app container
    <div className="app">
      {/* Displays header */}
      <Header />
      {/* React Router replaces outlet with right page component. */}
      <Outlet />
    </div>
  );
}
