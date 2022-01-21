import ReactDOM from "react-dom";
import Welcome from "./Welcome/Welcome.js";
import App from "./App/App.js";

fetch("/user/id.json")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        // user is logged in
        if (data.userId) {
            ReactDOM.render(<App />, document.querySelector("main"));
        } else {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        }
    });
