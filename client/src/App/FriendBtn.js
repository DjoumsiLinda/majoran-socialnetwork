import { useEffect, useState } from "react";

export default function FriendBtn(props) {
    if (props.id) {
        const [buttonText, setbuttonText] = useState("");
        const [statusChange, setStatusChange] = useState(false);

        useEffect(() => {
            fetch(`/friendshipstatus/${props.id}.json`)
                .then((res) => {
                    return res.json();
                })
                .then((status) => {
                    if (status === 0) {
                        setbuttonText("Send Friends Request");
                    } else {
                        if (status.accepted === false) {
                            if (status.sender_id === props.id) {
                                setbuttonText("Accept Friend Request");
                            } else {
                                setbuttonText("Cancel Friend Request");
                            }
                        } else if (status.accepted === true) {
                            setbuttonText("Unfriend");
                        }
                    }
                });
        }, [statusChange]);

        function handleClick() {
            if (buttonText === "Send Friends Request") {
                fetch(`/send-friend-request/${props.id}.json`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                }).then((res) => {
                    if (res.ok) {
                        setStatusChange(!statusChange);
                    }
                });
            } else if (buttonText === "Accept Friend Request") {
                fetch(`/accept-friend-request/${props.id}.json`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                }).then((res) => {
                    if (res.ok) {
                        setStatusChange(!statusChange);
                    }
                });
            } else {
                fetch(`/end-friendship/${props.id}.json`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                }).then((res) => {
                    if (res.ok) {
                        setStatusChange(!statusChange);
                    }
                });
            }
        }

        return <button onClick={handleClick}>{buttonText}</button>;
    } else {
        return <p>Fehler</p>;
    }
}
