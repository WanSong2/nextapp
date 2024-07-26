"use client";

import {
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
} from "react";
import { createConnection } from "@/components/chat/chat";
export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  useEffect(() => {
    const options = { serverUrl, roomId };
    console.log(options);
    const connection = createConnection(options);
    connection.on("message", (msg) => {
      onReceiveMessage(msg);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}
