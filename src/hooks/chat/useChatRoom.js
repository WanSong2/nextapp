"use client"

import { useEffect, useEffectEvent } from "react"
import { createConnection } from "@/components/chat/chat";
export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {

    const onMessage = useEffectEvent(() => onReceiveMessage);

    useEffect(() => {
        const options = { serverUrl, roomId }
        console.log(options);
        const connection = createConnection(options);
        connection.on('message', (msg) => {
            onMessage(msg)
        })
        connection.connect();
        return () => connection.disconnect();
    }, [roomId, serverUrl]);
}