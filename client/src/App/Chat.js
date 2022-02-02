import "../css/Chat.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket.js";

export default function Chat() {
    const [message, setMessage] = useState("");
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [disconnectUsers, setDisconnectUsers] = useState(null);
    const [listUsers, setListUers] = useState([]);
    const messages = useSelector(
        (state) =>
            state.messages &&
            state.messages.filter((message) => message.id !== null)
    );
    socket.on("connected-users", (listUsers) => {
        setConnectedUsers(listUsers);
    });
    socket.on("disconnected-users", (disconnectSocket, listUsers) => {
        setDisconnectUsers(disconnectSocket);
        setConnectedUsers(listUsers);
    });
    useEffect(() => {
        if (connectedUsers.length > 0) {
            fetch("/connected-users", {
                method: "POST",
                body: JSON.stringify({
                    users: connectedUsers,
                }),
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then((erg) => {
                    setListUers(erg);
                });
        }
    }, [connectedUsers]);
    function handleClick(e) {
        e.preventDefault();
        if (message !== "") {
            console.log("click: ", message);
            socket.emit("chatMessage", message);
            setMessage("");
        }
    }
    function handleChange(evt) {
        setMessage(evt.target.value);
    }
    if (!messages) {
        return null;
    }
    return (
        <div id="contai">
            <div className="chat">
                <h2 id="nam">Chat with other user</h2>
                <div id="lastMessages">
                    <div>
                        {messages.map((message) => {
                            return (
                                <div key={message.id} className="message">
                                    <a href={`/user/${message.users_id}`}>
                                        <img
                                            src={
                                                message.url ||
                                                "/assets/default.jpeg"
                                            }
                                            onError={(evt) => {
                                                evt.target.src =
                                                    "/assets/default.jpeg";
                                            }}
                                        />
                                    </a>
                                    <div>
                                        <div className="first">
                                            <h2>
                                                {message.first} {message.last}
                                            </h2>

                                            <p>
                                                {new Intl.DateTimeFormat(
                                                    "en-US",
                                                    {
                                                        dateStyle: "full",
                                                        timeStyle: "short",
                                                    }
                                                ).format(
                                                    new Date(message.created_at)
                                                )}
                                            </p>
                                        </div>
                                        <div className="second">
                                            <p className="msg">
                                                {message.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div id="writeMessage">
                    <form onSubmit={handleClick} id="formId">
                        <textarea
                            type="text"
                            name="message"
                            value={message}
                            onChange={handleChange}
                            rows="4"
                            cols="80"
                            placeholder="you can answer questions here or ask your questions here"
                        ></textarea>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
            <div className="connectUsers">
                {connectedUsers.length > 1 ? (
                    <div>
                        <h2>Online Users</h2>
                        <div className="users">
                            {" "}
                            {listUsers.map((user) => {
                                return (
                                    <div key={user.id} className="con">
                                        <a href={`/user/${user.id}`}>
                                            <img
                                                src={
                                                    user.url ||
                                                    "/assets/default.jpeg"
                                                }
                                                onError={(evt) => {
                                                    evt.target.src =
                                                        "/assets/default.jpeg";
                                                }}
                                            />
                                            {user.first} {user.last}
                                            {disconnectUsers === user.id && (
                                                <p> ist Offline</p>
                                            )}
                                        </a>
                                    </div>
                                );
                            })}{" "}
                        </div>
                    </div>
                ) : (
                    <p>Not People</p>
                )}
            </div>
        </div>
    );
}
