import "../css/ResetPassword.css";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 1 = start, 2 = verify, 3 = success
            error: false,
            step: 1,
            email: "",
            code: "",
            password: "",
            codeId: "",
            expiration: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleSubmit(evt) {
        evt.preventDefault();
        if (this.state.step === 1) {
            fetch("/resetPassword/start.json", {
                method: "POST",
                body: JSON.stringify({
                    email: this.state.email,
                }),
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((res) => {
                    if (res.ok) {
                        this.setState({ step: 2 });
                        return res.json();
                    } else {
                        this.setState({ error: true });
                    }
                })
                .then((data) => {
                    this.setState({ codeId: data });
                });
        } else if (this.state.step === 2) {
            fetch("/resetPassword/verify.json", {
                method: "POST",
                body: JSON.stringify({
                    codeId: this.state.codeId,
                    email: this.state.email,
                    code: this.state.code,
                    password: this.state.password,
                }),
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        this.setState({ error: true });
                    } else {
                        return res.json();
                    }
                })
                .then((erg) => {
                    if ("expiration" in erg) {
                        this.setState({ expiration: true });
                    } else {
                        this.setState({ step: 3 });
                        //delete secretcode in db
                        fetch("/resetPassword/success.json", {
                            method: "POST",
                            body: JSON.stringify({
                                codeId: this.state.codeId,
                            }),
                            headers: {
                                "content-type": "application/json",
                            },
                        }).then((res) => {
                            if (!res.ok) {
                                console.log("Delete codeId not successfull");
                            }
                        });
                    }
                });
        }
    }
    render() {
        if (this.state.step === 1) {
            return (
                <div id="reset">
                    <h2>Reset Password</h2>
                    <p>
                        Please enter your email address with which you
                        registered
                    </p>
                    {this.state.error && (
                        <p className="errorstep1">
                            Oups,Sorry sommething is wrong. Please try again!
                        </p>
                    )}
                    <form
                        className="resetPassword"
                        onSubmit={this.handleSubmit}
                    >
                        <input
                            type="email"
                            name="email"
                            placeholder="E-Mail"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <button type="submit">Reset</button>
                    </form>
                </div>
            );
        } else if (this.state.step === 2) {
            return (
                <div id="reset">
                    <h2>Reset Password</h2>
                    {this.state.error && (
                        <p className="error">
                            Oups,Sorry sommething is wrong. Please try again!
                        </p>
                    )}
                    {this.state.expiration && (
                        <p className="error">
                            Oups,code has expired!{" "}
                            <Link to="/password"> Reset Password</Link>
                        </p>
                    )}
                    <form
                        className="resetPassword"
                        onSubmit={this.handleSubmit}
                    >
                        <p>Please enter your code that you received</p>
                        <input
                            type="text"
                            name="code"
                            placeholder="Code"
                            value={this.state.code}
                            onChange={this.handleChange}
                        />
                        <p>Please enter a new Password</p>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            );
        } else if (this.state.step === 3) {
            return (
                <div>
                    <h2>Password successfull Reset!</h2>
                    <p>
                        You can now <Link to="/login">Log in</Link> with your
                        new password
                    </p>
                </div>
            );
        }
    }
}
