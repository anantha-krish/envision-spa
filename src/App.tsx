import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "./store";

const App = () => {
  const theme = useSelector((state: RootState) => state.app.theme);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <div className="transition-theme duration-1000 ease-in-out">
      <Navbar />
      <Toaster position="top-right" />
      <Outlet />
    </div>
  );
};

export default App;
