import { Component } from "react";
import "./css/App.css";
import ProfilePicture from "./ProfilePicture.js";
import Uploader from "./Uploader.js";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            url: "",
            uploaderVisible: false,
        };
        this.componentVisible = this.componentVisible.bind(this);
    }

    componentDidMount() {
        fetch("/app.json")
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    this.setState({ error: true });
                }
            })
            .then((users) => {
                this.setState({ firstname: users.first });
                this.setState({ lastname: users.last });
                this.setState({ email: users.email });
                this.setState({ url: users.url });
            });
    }

    componentVisible(url) {
        this.setState({ uploaderVisible: !this.state.uploaderVisible });
        console.log("1:", this.state.url);
        if (url) {
            this.setState({ url: url });
        } else {
            this.setState({ url: this.state.url });
        }
        console.log("2:", this.state.url);
    }

    render() {
        return (
            <div>
                <div id="app">
                    <h1>Linda Fashion</h1>
                    <img src="/assets/logo.png" />
                </div>
                <div id="all">
                    <ProfilePicture
                        picture={this.state.url}
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        email={this.state.email}
                        componentVisible={this.componentVisible}
                    />
                    {this.state.uploaderVisible && (
                        <Uploader componentVisible={this.componentVisible} />
                    )}
                </div>
            </div>
        );
    }
}
