import "../css/Logout.css";
import { useEffect } from "react";

export default function Delete() {
    useEffect(() => {
        fetch("delete.json").then((res) => {
            if (res.ok) {
                console.log("Bye");
                location.replace("/");
            }
        });
    }, []);
    return <div className="logout">Bye Bye</div>;
}
