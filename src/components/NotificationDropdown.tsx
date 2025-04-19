import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useNotificationSocket } from "../utils/useNotificationSocket";
import { useEffect, useState } from "react";
import { fetchNotifications } from "../features/app/appActions";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";

const NotificationTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "STATUS_CHANGE":
      return <span className="text-info">🔄</span>;
    case "COMMENT":
      return <span className="text-success">💬</span>;
    case "LIKE":
      return <span className="text-pink-500">❤️</span>;
    case "FILE_ADDED":
      return <span className="text-warning">📎</span>;
    default:
      return <span>🔔</span>;
  }
};

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {unreadCount > 0 && (
            <span className="badge badge-sm p-1 bg-red-500 text-white indicator-item">
              {unreadCount}
            </span>
          )}
        </div>
      </button>

      <ul
        className="dropdown dropdown-end menu w-80 rounded-box bg-base-100 shadow p-4"
        popover="auto"
        onToggle={toggleDropdown}
        id="popover-1"
        style={{ positionAnchor: "--anchor-1" } as React.CSSProperties}
      >
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li
              key={notification.id}
              className={clsx(
                "flex flex-row items-center gap-2 rounded p-2 text-sm",
                notification.isRead
                  ? "hover:bg-base-200"
                  : "bg-blue-50 hover:bg-blue-100"
              )}
            >
              <div className="flex-shrink-0">
                <NotificationTypeIcon type={notification.type} />
              </div>

              <div className="flex-1 min-w-0">
                {notification.ideaId && (
                  <Link
                    className="font-medium text-blue-600 hover:underline"
                    to={`/ideas/$ideaId`}
                    params={{ ideaId: notification.ideaId.toString() }}
                  >
                    IDEA-{notification.ideaId}
                  </Link>
                )}
                <p className="text-gray-700 break-words line-clamp-2">
                  {notification.message}
                </p>
              </div>

              {!notification.isRead && (
                <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
              )}
            </li>
          ))
        ) : (
          <li className="text-center p-2 text-gray-500">
            There are no notifications to show.
          </li>
        )}
      </ul>
    </>
  );
};
