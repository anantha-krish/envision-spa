import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/app/appSlice";
import clsx from "clsx";
import { RootState } from "../store";

export const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.app.theme);
  const radioStyle = clsx(
    "absolute h-7 w-7 left-1 top-1 rounded-full flex items-center justify-center text-sky-600 shadow-md transition-transform duration-500 border-1 peer-checked:translate-x-7 ",
    { "bg-gray-800": theme === "dark", "bg-white": theme === "light" }
  );
  return (
    <label className="relative inline-block w-16 h-9">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={() => dispatch(toggleTheme())}
        className="peer opacity-0 w-0 h-0"
      />
      <span className="absolute inset-0 bg-gray-200 rounded-full cursor-pointer transition-colors duration-500 peer-checked:bg-sky-500 border-2 border-sky-500"></span>

      <span className={radioStyle}>
        {theme === "dark" ? (
          <MoonIcon className="w-5 text-white " />
        ) : (
          <SunIcon className="w-5 text-sky-600" />
        )}
      </span>
    </label>
  );
};
