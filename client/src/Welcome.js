import "./css/Welcome.css";
import Registration from "./Registration.js";
export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Linda Fashion</h1>
            <img src="/assets/logo.png" />
            <Registration />
        </div>
    );
}
