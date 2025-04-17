import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import { setNotificationCount } from "../features/app/appSlice";

type NotificationMessage = {
  type: string;
  payload?: unknown;
};

export function useNotificationSocket(accessToken: string) {
  const socketRef = useRef<Socket | null>(null);
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryCountRef = useRef<number>(0);
  const maxRetries = 3;
  const dispatch = useDispatch();

  const connect = useCallback(() => {
    if (retryCountRef.current >= maxRetries) {
      console.warn("🚫 Max WebSocket reconnection attempts reached.");
      return;
    }

    const wsBaseUrl = import.meta.env.VITE_WS_URL;
    const socket = io(wsBaseUrl, {
      query: { token: accessToken },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🔗 WebSocket connected!");
      retryCountRef.current = 0; // Reset retries on success
    });

    socket.on(
      "notification_event",
      (data: NotificationMessage, ack?: (response: string) => void) => {
        console.log("📩 Notification received:", data);

        if (data.type === "unread_count" && typeof data.payload === "number") {
          dispatch(setNotificationCount(data.payload));
        }

        if (ack) ack("✅ Client received the notification.");
      }
    );

    socket.on("disconnect", (reason: string) => {
      console.log(`⚡ Disconnected: ${reason}`);
      retryCountRef.current += 1;

      if (retryCountRef.current < maxRetries) {
        reconnectRef.current = setTimeout(connect, 5000); // Retry in 5s
      } else {
        console.warn("❌ Max reconnection attempts reached. Giving up.");
      }
    });

    socket.on("error", (error) => {
      console.error("🚨 Socket error:", error);
      socket.disconnect(); // Force disconnect to trigger retry logic
    });
  }, [accessToken, dispatch]);

  useEffect(() => {
    connect();

    return () => {
      console.log("🧹 Cleaning up WebSocket connection.");
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      socketRef.current?.disconnect();
    };
  }, [connect]);
}
