import { useEffect } from "react";

import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { showSessionExpiryModal } from "../features/app/appSlice";

export function useTokenExpiryWatcher(accessToken: string) {
  const dispatch = useDispatch();

  useEffect(() => {
    const expiry = jwtDecode(accessToken).exp;

    if (!expiry) return;

    const now = Date.now();
    const timeLeft = expiry - now - 60 * 1000; // trigger 1 min before

    if (timeLeft <= 0) {
      dispatch(showSessionExpiryModal());
      return;
    }

    const timer = setTimeout(() => {
      dispatch(showSessionExpiryModal());
    }, timeLeft);

    return () => clearTimeout(timer);
  }, [accessToken, dispatch]);
}
