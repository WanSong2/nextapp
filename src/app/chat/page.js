"use client";

import { useState } from "react";
import { ChatRoom } from "@/components/chat/ChatRoom";
import { useOnlineStatus } from "@/hooks/chat/useOnlineStatus";

export default function App() {
  const [roomId, setRoomId] = useState("general");
  const isOnline = useOnlineStatus();

  console.log("roomId", roomId);
  console.log("isOnline", isOnline);

  return (
    <>
      <label>
        Choose the chat room:{" "}
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}
