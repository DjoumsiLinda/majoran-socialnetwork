import "../css/Login.css";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        fetch("/login.json", {
            method: "POST",
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
            headers: {
                "content-type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                location.href = "/";
            } else {
                this.setState({ error: true });
            }
        });
    }

    render() {
        return (
            <div id="lo">
                <h2>Join LKD~Fashion</h2>
                {this.state.error && (
                    <p className="error">Oups, Please try again!</p>
                )}
                <form className="login" onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="E-Mail-Adresse"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Login</button>
                </form>
                <Link to="/password">Reset Password</Link>
                <Link to="/">Registration</Link>
            </div>
        );
    }
}
