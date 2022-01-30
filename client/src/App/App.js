import "../css/App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { Component } from "react";
import ProfilePicture from "./ProfilePicture.js";
import Friends from "./Friends";
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
            <div>
                <div id="app">
                    <h1>LKD~Fashion</h1>
                    <img src="/assets/logo.png" />
                </div>
                <div id="all">
                    <header>
                        <a href="/user">Find People</a>
                        <a href="/friends">Friends</a>
                        <ProfilePicture
                            picture={user.url}
                            first={user.first}
                            last={user.last}
                            email={user.email}
                            componentVisible={this.componentVisible}
                        />
                    </header>
                    <div id="tocenter">
                        <BrowserRouter>
                            <Route exact path="/">
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
export default connect(mapStateToProps, {
    receivedUsers,
    setbioHook,
    seturlHook,
})(App);
