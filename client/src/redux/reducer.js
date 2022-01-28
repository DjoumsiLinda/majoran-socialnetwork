import { combineReducers } from "redux";
import friendsReducer from "./friends/slice";
import bioReducer from "./bio/slice";
import usersReducer from "./users/slice";

const rootReducer = combineReducers({
    friends: friendsReducer,
    bio: bioReducer,
    users: usersReducer,
});

export default rootReducer;
