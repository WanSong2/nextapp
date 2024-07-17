"use client"

import { useState } from "react";
import { useChatRoom } from "@/hooks/chat/useChatRoom";

export function ChatRoom({ roomId }) {
    const [serverUrl, setServerUrl] = useState('https://localhost:1234');

    useChatRoom({
        roomId,
        serverUrl,
        onReceiveMessage(msg) {
            console.log('New message: ' + msg);
        }
    })

    return <>{roomId}</>;
}