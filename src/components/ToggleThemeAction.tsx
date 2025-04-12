import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { RootState } from "../store";

export const ToggleThemeAction = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <div className="w-20 p-0.5 h-10 border-2 border-sky-700 rounded-4xl flex items-center justify-start transition-colors duration-1000 relative">
      <button
        className={`absolute p-0.5 border-2 border-sky-700 rounded-full bg-sky-600 text-white dark:bg-gray-800 hover:bg-sky-500 dark:hover:bg-sky-800 hover:text-white transition-all duration-300 ease-in-out transform hover:cursor-pointer ${
          theme === "dark" ? "translate-x-10" : "translate-x-0"
        }`}
        onClick={() => dispatch(toggleTheme())}
      >
        {theme === "light" ? (
          <SunIcon className="w-6" />
        ) : (
          <MoonIcon className="w-6 text-white" />
        )}
      </button>
    </div>
  );
};
