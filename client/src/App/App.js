import "../css/App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Component } from "react";
import ProfilePicture from "./ProfilePicture.js";
import FindPeople from "./FindPeople.js";
import Profile from "./Profile.js";
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
            bio: "",
        };
        this.componentVisible = this.componentVisible.bind(this);
        this.setbio = this.setbio.bind(this);
    }

    componentDidMount() {
        console.log("you first");
        fetch("/app.json")
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    this.setState({ error: true });
                }
            })
            .then((users) => {
                this.setState({
                    firstname: users.first,
                    lastname: users.last,
                    email: users.email,
                    url: users.url,
                    bio: users.bio,
                });
            });
    }

    componentVisible(url) {
        this.setState({ uploaderVisible: !this.state.uploaderVisible });
        if (url) {
            this.setState({ url: url });
        } else {
            this.setState({ url: this.state.url });
        }
    }
    setbio(bio) {
        this.setState({
            bio: bio,
        });
    }

    render() {
        if (!this.state.email) {
            return <p>Waiting</p>;
        }
        return (
            <div>
                <div id="app">
                    <h1>LKD~Fashion</h1>
                    <img src="/assets/logo.png" />
                </div>
                <div id="all">
                    <header>
                        {/*<Link to="/users">Find People</Link>*/}
                        <a href="/users">Find People</a>
                        <ProfilePicture
                            picture={this.state.url}
                            firstname={this.state.firstname}
                            lastname={this.state.lastname}
                            email={this.state.email}
                            componentVisible={this.componentVisible}
                        />
                    </header>
                    <div id="tocenter">
                        <BrowserRouter>
                            <Route exact path="/">
                                <Profile
                                    picture={this.state.url}
                                    firstname={this.state.firstname}
                                    lastname={this.state.lastname}
                                    email={this.state.email}
                                    bio={this.state.bio}
                                    setbio={this.setbio}
                                    componentVisible={this.componentVisible}
                                />
                            </Route>
                            <Route path="/users">
                                <FindPeople />
                            </Route>
                        </BrowserRouter>
                    </div>

                    {this.state.uploaderVisible && (
                        <Uploader componentVisible={this.componentVisible} />
                    )}
                </div>
            </div>
        );
    }
}
