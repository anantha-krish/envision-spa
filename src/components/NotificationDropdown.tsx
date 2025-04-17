import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useNotificationSocket } from "../utils/useNotificationSocket";
import { useEffect, useState } from "react";
import { fetchNotifications } from "../features/app/appActions";

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />{" "}
  </svg>
);
export const NotificationDropdown: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  useNotificationSocket(accessToken ?? "");

  const [isOpen, setIsOpen] = useState(false); // Track the open/close state of the dropdown

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);
  const unreadCount = useSelector(
    (state: RootState) => state.app.unreadNotificationCount
  );
  const notifications = useSelector(
    (state: RootState) => state.app.notifications
  );

  return (
    <>
      <button
        className="btn btn-ghost btn-circle"
        popoverTarget="popover-1"
        style={{ anchorName: "--anchor-1" } as React.CSSProperties}
      >
        <div className="indicator">
          <BellIcon />
          {unreadCount > 0 && (
            <span className="badge badge-sm p-1 bg-red-500 text-white indicator-item">
              {unreadCount}
            </span>
          )}
        </div>
      </button>
      <ul
        className="dropdown dropdown-end menu w-sm rounded-box bg-base-100 shadow-sm p-8"
        popover="auto"
        onToggle={toggleDropdown}
        id="popover-1"
        style={{ positionAnchor: "--anchor-1" } as React.CSSProperties}
      >
        {notifications?.map((notification) => (
          <li key={notification.id} className="min-h-10 p-2 shadow-blue-500">
            {notification.message}
          </li>
        ))}
      </ul>
    </>
  );
};
