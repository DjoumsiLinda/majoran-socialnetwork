//reducer
export default function urlReducer(url = null, action) {
    if (action.type === "users/setUrl") {
        url = action.payload.url;
    }
    return url;
}

//actions creations
export function seturlHook(url) {
    return {
        type: "users/setUrl",
        payload: { url },
    };
}
