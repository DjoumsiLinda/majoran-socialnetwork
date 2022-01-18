import "./css/Registration.css";

import { Component } from "react";

export default class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: "",
            lastname: "",
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

        console.log("handleSubmit", this.state);

        fetch("/registration.json", {
            method: "POST",
            body: JSON.stringify({
                first: this.state.firstname,
                last: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
            }),
            headers: {
                "content-type": "application/json",
            },
        }).then((res) => {
            console.log("res.ok", res.ok);

            if (res.ok) {
                location.reload();
            } else {
                this.setState({ error: true });
            }
        });
    }

    render() {
        return (
            <div id="regis">
                <h2>Join Linda Fashion</h2>
                {this.state.error && (
                    <p className="error">
                        There are already an account with these emails adresse!
                    </p>
                )}
                <form className="registration" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={this.state.firstname}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        value={this.state.lastname}
                        onChange={this.handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="E-Mail"
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
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}
