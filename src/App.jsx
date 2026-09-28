import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";

export default function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}
