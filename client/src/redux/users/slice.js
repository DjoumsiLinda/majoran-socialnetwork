//reducer
export default function usersReducer(users = null, action) {
    if (action.type === "users/receivedUsers") {
        users = action.payload.users;
    }
    return users;
}

//actions creations
export function receivedUsers(users) {
    return {
        type: "users/receivedUsers",
        payload: { users },
    };
}
