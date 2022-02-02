import { io } from "socket.io-client";

import { chatMessages, chatMessage } from "../redux/messages/slice.js";

export let socket;

// singleton pattern:
// make sure that we only ever have one single websocket connection open
export function init(store) {
    if (!socket) {
        socket = io();

        // last 10 chat messages
        socket.on("chatMessages", (messages) => {
            store.dispatch(chatMessages(messages));
        });

        // some user wrote a new message
        socket.on("chatMessage", (message) => {
            store.dispatch(chatMessage(message));
        });
    }
}
