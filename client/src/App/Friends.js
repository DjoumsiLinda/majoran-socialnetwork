import "../css/Friends.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    receiveFriends,
    acceptsFriends,
    endFriendship,
} from "../redux/friends/slice.js";

export default function Friends() {
    const dispatch = useDispatch();
    //getState
    const currentlyFriends = useSelector(
        (state) =>
            state.friends &&
            state.friends.filter((friends) => friends.accepted == true)
    );
    const sendFriendsRequest = useSelector(
        (state) =>
            state.friends &&
            state.friends.filter((friends) => friends.accepted == false)
    );
    useEffect(() => {
        fetch("/friends-wannabes.json")
            .then((res) => {
                return res.json();
            })
            .then((friends) => {
                console.log("Friends: ", friends);
                dispatch(receiveFriends(friends));
            });
    }, []);

    function handleAcceptFriendRequest(id) {
        fetch(`/accept-friend-request/${id}.json`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                dispatch(acceptsFriends(id));
            }
        });
    }

    function handleEndFriendship(id) {
        console.log("Click on handleEndFriendship :", id);
        fetch(`/end-friendship/${id}.json`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                dispatch(endFriendship(id));
            }
        });
    }

    function handleRejectFriendRequest(id) {
        fetch(`/end-friendship/${id}.json`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                dispatch(endFriendship(id));
            }
        });
    }
    if (!currentlyFriends || !sendFriendsRequest) {
        return null;
    }

    return (
        <div className="friends">
            <div id="find">
                <h2>These people are currently your friends</h2>
                {currentlyFriends.length !== 0 ? (
                    <ul>
                        {currentlyFriends.map((friend) => {
                            return (
                                <div key={friend.id} id="friend">
                                    <a href={`/user/${friend.id}`}>
                                        <img
                                            src={friend.url}
                                            onError={(evt) => {
                                                evt.target.src =
                                                    "/assets/default.jpeg";
                                            }}
                                        />
                                    </a>

                                    <div id="cen">
                                        <p>
                                            {friend.first} {friend.last}
                                        </p>
                                        <button
                                            onClick={() => {
                                                handleEndFriendship(friend.id);
                                            }}
                                        >
                                            End Friendship
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                ) : (
                    <div id="not">
                        <div>You have not friends ;(</div>
                    </div>
                )}
                <h2>These people want to be your friends</h2>
                {sendFriendsRequest.length !== 0 ? (
                    <ul>
                        {sendFriendsRequest.map((friend) => {
                            return (
                                <div key={friend.id} id="friend">
                                    <a href={`/user/${friend.id}`}>
                                        <img
                                            src={friend.url}
                                            onError={(evt) => {
                                                evt.target.src =
                                                    "/assets/default.jpeg";
                                            }}
                                        />
                                    </a>
                                    <div id="cen">
                                        <p className="send1">
                                            {friend.first} {friend.last}
                                        </p>
                                        <button
                                            className="send2"
                                            onClick={() => {
                                                handleAcceptFriendRequest(
                                                    friend.id
                                                );
                                            }}
                                        >
                                            Accept Friend Request
                                        </button>
                                        <button
                                            className="send3"
                                            onClick={() => {
                                                handleRejectFriendRequest(
                                                    friend.id
                                                );
                                            }}
                                        >
                                            Reject Friend Request
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                ) : (
                    <div id="not">
                        <div>You have not receive friendships ;(</div>
                    </div>
                )}
            </div>
        </div>
    );
}
