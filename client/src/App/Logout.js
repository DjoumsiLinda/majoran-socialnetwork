import "../css/Logout.css";
import { useEffect } from "react";

export default function Logout() {
    useEffect(() => {
        fetch("logout.json").then((res) => {
            if (res.ok) {
                console.log("Bye");
                location.replace("/login");
            }
        });
    }, []);
    return <div className="logout">Bye Bye</div>;
}
