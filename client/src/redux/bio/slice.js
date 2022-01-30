//reducer
export default function bioReducer(bio = null, action) {
    if (action.type === "users/setBio") {
        bio = action.payload.bio;
    }
    return bio;
}

//actions creations
export function setbioHook(bio) {
    return {
        type: "users/setBio",
        payload: { bio },
    };
}
