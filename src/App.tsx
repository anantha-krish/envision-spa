import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "./store";
import Loader from "./components/Loader";
import { useDynamicTitle } from "./utils/useDynamicPageTitle";

const App = () => {
  const theme = useSelector((state: RootState) => state.app.theme);
  useDynamicTitle();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <div className=" relative transition-all duration-1000 ease-in-out bg-gray-100 dark:bg-gray-900">
      <Loader />
      <Navbar />
      <Toaster position="top-right" />
      <div className="h-screen-minus-nav">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
