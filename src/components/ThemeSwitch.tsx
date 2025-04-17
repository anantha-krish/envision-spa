import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/app/appSlice";
import clsx from "clsx";
import { RootState } from "../store";

export const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.app.theme);

  const radioStyle = clsx(
    "absolute h-5 w-5 top-1/2 left-0.5 transform -translate-y-1/2 rounded-full flex items-center justify-center text-sky-600 shadow-lg transition-transform duration-300 border peer-checked:translate-x-6",
    { "bg-gray-800": theme === "dark", "bg-gray-100": theme === "light" }
  );

  return (
    <label className="relative inline-block w-12 h-6">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={() => dispatch(toggleTheme())}
        className="peer opacity-0 w-0 h-0"
      />
      <span className="absolute inset-0 bg-gray-200 rounded-full cursor-pointer transition-colors duration-500 peer-checked:bg-sky-500 border border-sky-700"></span>

      <span className={radioStyle}>
        {theme === "dark" ? (
          <MoonIcon className="w-3 text-white" />
        ) : (
          <SunIcon className="w-3 text-sky-600" />
        )}
      </span>
    </label>
  );
};
