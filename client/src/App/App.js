import "../css/App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { Component } from "react";
import ProfilePicture from "./ProfilePicture.js";
import Chat from "./Chat";
import Friends from "./Friends";
import Logout from "./Logout";
import Delete from "./Delete";
import FindPeople from "./FindPeople.js";
import Profile from "./Profile.js";
import OtherProfile from "./OtherProfile.js";
import Uploader from "./Uploader.js";
import { connect } from "react-redux";
import { receivedUsers } from "../redux/users/slice";
import { setbioHook } from "../redux/bio/slice";
import { seturlHook } from "../redux/url/slice";

let user = null;
const mapStateToProps = (state) => {
    if (state.users && state.users.id !== 0) {
        user = state.users;
    }
    if (state.bio && state.bio !== "") {
        user = { ...user, bio: state.bio };
    }
    if (state.url && state.url !== "") {
        user = { ...user, url: state.url };
    }
    return { user };
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false,
            error: false,
        };

        this.componentVisible = this.componentVisible.bind(this);
        this.setbio = this.setbio.bind(this);
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
            .then((user) => {
                this.props.receivedUsers(user);
            });
    }

    componentVisible(url) {
        this.setState({ uploaderVisible: !this.state.uploaderVisible });
        if (url) {
            this.props.seturlHook(url);
        }
    }
    setbio(bio) {
        this.props.setbioHook(bio);
    }

    render() {
        if (!user) {
            return <p>Loading...</p>;
        }
        return (
            <div id="appMenu">
                <div id="menu">
                    <a href="/profile">
                        <img src="/assets/profile.png"></img>
                    </a>
                    <a href="/">About us</a>
                    <a href="/user">Find People</a>
                    <a href="/chat">Chat</a>
                    <a href="/friends">Friends</a>
                    <a href="/delete">Delete your account</a>
                    <a href="/logout">Logout</a>
                </div>
                <div id="inhalt">
                    <div id="app">
                        <div>
                            <h1>LKD~Fashion</h1>
                        </div>
                        <img src="/assets/logo.png" />
                    </div>
                    <div id="all">
                        <header>
                            <div id="alist">
                                <a href="/user">Find People</a>
                                <a href="/chat">Chat</a>
                                <a href="/friends">Friends</a>
                                <ProfilePicture
                                    picture={user.url}
                                    first={user.first}
                                    last={user.last}
                                    email={user.email}
                                    componentVisible={this.componentVisible}
                                />
                            </div>
                        </header>
                        <div id="tocenter">
                            <BrowserRouter>
                                <Route exact path="/"></Route>
                                <Route exact path="/profile">
                                    <Profile
                                        picture={user.url}
                                        first={user.first}
                                        last={user.last}
                                        email={user.email}
                                        bio={user.bio}
                                        setbio={this.setbio}
                                        componentVisible={this.componentVisible}
                                    />
                                </Route>
                                <Route exact path="/user">
                                    <FindPeople />
                                </Route>
                                <Route path="/user/:id">
                                    <OtherProfile />
                                </Route>
                                <Route path="/friends">
                                    <Friends />
                                </Route>
                                <Route path="/chat">
                                    <Chat />
                                </Route>
                                <Route path="/logout">
                                    <Logout />
                                </Route>
                                <Route path="/delete">
                                    <Delete />
                                </Route>
                            </BrowserRouter>
                        </div>

                        {this.state.uploaderVisible && (
                            <Uploader
                                componentVisible={this.componentVisible}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, {
    receivedUsers,
    setbioHook,
    seturlHook,
})(App);
