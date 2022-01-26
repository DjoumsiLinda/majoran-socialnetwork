import { useEffect, useState } from "react";

export default function FriendBtn(props) {
    if (props.id) {
        const [buttonText, setbuttonText] = useState("");
        console.log("ID:", props.id);

        useEffect(() => {
            fetch(`/friendshipstatus/${props.id}.json`)
                .then((res) => {
                    return res.json();
                })
                .then((status) => {
                    console.log(status);
                    if (status === 0) {
                        setbuttonText("Send Friends Request");
                    } else if (status === 1) {
                        setbuttonText("todo");
                        return;
                    }
                });
        }, []);

        function handleClick() {
            if (buttonText === "Send Friends Request") {
                console.log("Iam Send Friends Request");
                fetch(`/send-friend-request/${props.id}.json`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                }).then((res) => {
                    if (res.ok) {
                        console.log("Insert ist succefull");
                    }
                });
            }
        }

        return <button onClick={handleClick}>{buttonText}</button>;
    } else {
        return <p>Fehler</p>;
    }
}
