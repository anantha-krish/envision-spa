import { useSelector } from "react-redux";
import { RootState } from "../store";

const Loader = () => {
  const activeRequests = useSelector(
    (state: RootState) => state.app.activeRequests
  );
  const envisionLogo = new URL("/assets/images/logo.png", import.meta.url).href;

  return activeRequests > 0 ? (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/10 dark:bg-white/5 backdrop-invert backdrop-opacity-5">
      <div className="relative w-30">
        <span className="loading loading-spinner  w-full text-secondary"></span>
        <img
          src={envisionLogo}
          alt="Envision Logo"
          className="h-13 w-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  ) : null;
};

export default Loader;
