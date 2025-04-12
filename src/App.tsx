import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="transition-theme duration-1000 ease-in-out">
      <Navbar />
      <Toaster position="top-right" />
      <Outlet />
    </div>
  );
};

export default App;
