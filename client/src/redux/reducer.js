import { combineReducers } from "redux";
import friendsReducer from "./friends/slice";
import bioReducer from "./bio/slice";
import urlReducer from "./url/slice";
import usersReducer from "./users/slice";
import otherUsersReducer from "./other-users/slice";
import otherFriendsReducer from "./other-friends/slice";
import messagesReducer from "./messages/slice";

const rootReducer = combineReducers({
    friends: friendsReducer,
    users: usersReducer,
    bio: bioReducer,
    url: urlReducer,
    otherUsers: otherUsersReducer,
    otherFriends: otherFriendsReducer,
    messages: messagesReducer,
});

export default rootReducer;
