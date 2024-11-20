import { Outlet } from "@tanstack/react-router";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header";
import "@/App.css";

function App() {
  return (
    <div className="bg-gray-100">
      <Header />
      <div className="app-container min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
