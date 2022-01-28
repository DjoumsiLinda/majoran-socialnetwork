//reducer
export default function friendsReducer(friends = null, action) {
    if (action.type === "friends/receivedFriends") {
        friends = action.payload.friends;
    } else if (action.type === "friends/acceptsFriends") {
        const newFriends = [...friends]; //copy state

        for (let idx = 0; idx < newFriends.length; idx++) {
            if (newFriends[idx].id === action.payload.id) {
                newFriends[idx] = {
                    ...newFriends[idx],
                    accepted: true,
                };
            }
        }

        return newFriends;
    } else if (action.type === "friends/endFriendship") {
        const newFriends = [...friends]; //copy state

        for (let idx = 0; idx < newFriends.length; idx++) {
            if (newFriends[idx].id === action.payload.id) {
                newFriends.splice(idx, 1);
                break;
            }
        }

        return newFriends;
    }

    return friends;
}

//actions creations
export function receiveFriends(friends) {
    return {
        type: "friends/receivedFriends",
        payload: { friends },
    };
}

export function acceptsFriends(id) {
    return {
        type: "friends/acceptsFriends",
        payload: { id },
    };
}

export function endFriendship(id) {
    return {
        type: "friends/endFriendship",
        payload: { id },
    };
}
