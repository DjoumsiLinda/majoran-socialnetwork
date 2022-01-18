import ReactDOM from "react-dom";
import Welcome from "./Welcome.js";

fetch("/user/id.json")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        // user is logged in
        if (data.userId) {
            ReactDOM.render(
                <img src="https://www.spiced-academy.com/img/Spiced_Logo_Dark.svg" />,
                document.querySelector("main")
            );
        } else {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        }
    });
