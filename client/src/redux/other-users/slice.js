//reducer
export default function otherUsersReducer(user = null, action) {
    if (action.type === "other-users/receivedUser") {
        user = action.payload.user;
    }
    return user;
}

//actions creations
export function receivedUser(user) {
    return {
        type: "other-users/receivedUser",
        payload: { user },
    };
}
