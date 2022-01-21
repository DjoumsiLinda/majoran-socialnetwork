import "../css/Welcome.css";
import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./Registration.js";
import Login from "./Login.js";
import ResetPassword from "./ResetPassword.js";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Linda~Fashion</h1>
            <img src="/assets/logo.png" />
            <BrowserRouter>
                <Route exact path="/">
                    <Registration />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/password">
                    <ResetPassword />
                </Route>
            </BrowserRouter>
        </div>
    );
}
