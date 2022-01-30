//reducer
export default function otherFriendsReducer(friends = null, action) {
    if (action.type === "other-friends/receivedFriends") {
        friends = action.payload.friends;
    }
    return friends;
}

//actions creations
export function receivedFriends(friends) {
    return {
        type: "other-friends/receivedFriends",
        payload: { friends },
    };
}
