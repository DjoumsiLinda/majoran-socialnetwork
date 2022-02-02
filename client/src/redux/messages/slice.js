// reducer
export default function messagesReducer(messages = null, action) {
    if (action.type === "mesages/chatMessages") {
        messages = action.payload.messages;
    } else if (action.type === "mesages/chatMessage") {
        const newMessages = [...messages]; //copy state

        newMessages.push(action.payload.message);

        return newMessages;
    }

    return messages;
}

// action creators
export function chatMessages(messages) {
    return {
        type: "mesages/chatMessages",
        payload: { messages },
    };
}

export function chatMessage(message) {
    // TODO: implement action object
    return {
        type: "mesages/chatMessage",
        payload: { message },
    };
}
