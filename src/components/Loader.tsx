import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Loader = () => {
  const activeRequests = useSelector(
    (state: RootState) => state.app.activeRequests
  );
  const envisionLogo = new URL("/assets/images/logo.png", import.meta.url).href;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (activeRequests > 0) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [activeRequests]);

  return (
    <dialog
      ref={dialogRef}
      className="modal bg-transparent backdrop:bg-black/5 dark:backdrop:bg-white/5 backdrop:backdrop-invert backdrop:backdrop-opacity-5 p-0 border-0"
    >
      <div className="modal-box rounded-full flex justify-center items-center relative w-42 h-42 p-0">
        <span className="loading loading-spinner text-secondary w-full"></span>
        <img
          src={envisionLogo}
          alt="Envision Logo"
          className="h-20 w-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </dialog>
  );
};

export default Loader;
