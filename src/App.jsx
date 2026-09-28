import Home from "./pages/Home.jsx";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="app">
      <h1>Project Gutendex</h1>
      <Outlet />
    </div>
  );
}
