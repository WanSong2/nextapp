"use client"

import { useState } from "react";
import { ChatRoom } from "@/components/chat/ChatRoom";

export default function App() {

    const [roomId, setRoomId] = useState('general');

    console.log('roomId', roomId);

    return (
        <>
            <label>
                Choose the chat room:{' '}
                <select
                    value={roomId}
                    onChange={e => setRoomId(e.target.value)}
                >
                    <option value="general">general</option>
                    <option value="travel">travel</option>
                    <option value="music">music</option>
                </select>
            </label>
            <hr />
            <ChatRoom
                roomId={roomId}
            />
        </>
    );
}