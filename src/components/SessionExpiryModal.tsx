import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { requestRefreshAccessToken } from "../features/app/appActions";
import { useNavigate } from "@tanstack/react-router";

export const SessionExpireModal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector(
    (state: RootState) => state.app.showSessionExpiryModal
  );
  const navigate = useNavigate();
  return showModal ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Session Expiring Soon</h3>
          <p className="py-4">
            Your session will expire soon. Would you like to extend it?
          </p>
          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={() => dispatch(requestRefreshAccessToken())}
            >
              Extend Session
            </button>
            <button className="btn" onClick={() => navigate({ to: "/logout" })}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
