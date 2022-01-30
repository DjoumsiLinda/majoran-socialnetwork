import "../css/OtherProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { receivedUser } from "../redux/other-users/slice.js";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import FriendBtn from "./FriendBtn.js";
import OtherFriends from "./OtherFriends.js";

export default function OtherProfile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => {
        if (state.otherUsers !== null && state.otherUsers.id !== 0) {
            return state.otherUsers;
        }
    });
    const [error, setError] = useState(false);
    const { id } = useParams(); // url params
    const history = useHistory();

    useEffect(() => {
        fetch(`/userProfile/${id}.json`)
            .then((res) => {
                return res.json();
            })
            .then((user) => {
                if ("sameId" in user) {
                    return history.replace("/");
                } else {
                    dispatch(receivedUser(user));
                }
            })
            .catch(() => {
                setError(true);
            });
    }, [id]);
    if (!user) {
        return (
            <div className="otherProfile">
                <p id="error">Error</p>
            </div>
        );
    }
    return (
        <div className="otherProfile">
            <div id="left">
                {error ? (
                    <p id="error">Error</p>
                ) : (
                    <div id="user">
                        <div id="friendBtn">
                            <img
                                src={user.url || "/assets/default.jpeg"}
                                onError={(evt) => {
                                    evt.target.src = "/assets/default.jpeg";
                                }}
                            />
                            <FriendBtn id={user.id} />
                        </div>
                        <div id="cen">
                            <p>
                                {user.first} {user.last}
                            </p>
                            {user.bio ? <p>{user.bio}</p> : <p>Not bio yet</p>}
                        </div>
                    </div>
                )}
            </div>
            <div id="right">
                <OtherFriends id={id} />
            </div>
        </div>
    );
}
