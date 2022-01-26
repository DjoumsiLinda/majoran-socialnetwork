import "../css/OtherProfile.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import FriendBtn from "./FriendBtn.js";

export default function OtherProfile() {
    const [user, setUser] = useState("");
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
                    setUser(user);
                }
            })
            .catch(() => {
                setError(true);
            });
    }, [id]);

    return (
        <div className="otherProfile">
            {error ? (
                <p id="error">Error</p>
            ) : (
                <div id="user">
                    <div id="friendBtn">
                        <img src={user.url || "/assets/default.jpeg"} />
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
    );
}
