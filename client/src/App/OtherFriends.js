import { useEffect, useState } from "react";
import "../css/OtherFriends.css";
import { Link } from "react-router-dom";

export default function OtherFriends(props) {
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        fetch(`/otherFriendsProfile/${props.id}.json`)
            .then((res) => {
                return res.json();
            })
            .then((usersData) => {
                setFriends(usersData);
            });
    }, []);

    return (
        <div className="OtherFriends">
            <div id="back">
                <a href="/">Home</a>
            </div>
            {friends.length === 0 ? (
                <p id="not">Not Friends</p>
            ) : (
                <ul>
                    {friends.first} {friends.last}
                    {friends.map((user) => {
                        return (
                            <div key={user.id} id="people">
                                <a href={`/user/${user.id}`}>
                                    <img
                                        src={user.url || "/assets/default.jpeg"}
                                        onError={(evt) => {
                                            evt.target.src =
                                                "/assets/default.jpeg";
                                        }}
                                    />
                                </a>
                                <div id="cen">
                                    <p>
                                        {user.first} {user.last} {user.id}
                                    </p>
                                    <Link to={`/user/${user.id}`} id="link">
                                        See More
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
