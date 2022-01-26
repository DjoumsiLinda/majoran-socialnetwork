import "../css/Welcome.css";
import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./Registration.js";
import Login from "./Login.js";
import ResetPassword from "./ResetPassword.js";

export default function Welcome() {
    return (
        <div id="welcome">
            <div className="left">
                <h1>LKD~Fashion</h1>
                <p>
                    LKD~Fashion is a plattform where you can share your
                    creations. Stay connected!
                </p>
                {/*<img src="/assets/logo.png" />*/}
            </div>
            <div className="recht">
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
        </div>
    );
}
