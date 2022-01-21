import { Component } from "react";
import "../css/BioEditor.css";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            draft: this.props.bio,
            editing: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleClick(evt) {
        evt.preventDefault();
        this.setState({ editing: !this.state.editing });
    }
    handleClickSave(evt) {
        evt.preventDefault();
        //fe
        fetch("/bioEditor.json", {
            method: "POST",
            body: JSON.stringify({
                bio: this.state.draft,
            }),
            headers: {
                "content-type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                this.setState({ editing: !this.state.editing });
                this.props.setbio(this.state.draft);
            } else {
                this.setState({ error: true });
            }
        });
    }
    handleClickEdit(evt) {
        evt.preventDefault();
        this.setState({ editing: !this.state.editing });
    }
    render() {
        // user is in editing
        if (this.state.editing) {
            return (
                <div id="bioEditor">
                    <textarea
                        type="text"
                        name="draft"
                        value={this.state.draft}
                        placeholder="Add your Biography Here"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleClickSave}>Save</button>
                </div>
            );
            // user is not in editing mode & already has a bio
        } else if (this.props.bio) {
            return (
                <div id="btxEditor">
                    <p>{this.props.bio}</p>
                    <button onClick={this.handleClickEdit}> Edit</button>
                </div>
            );
            // user is not in editing mode & has NO bio yet
        } else {
            return (
                <button id="btx" onClick={this.handleClick}>
                    Add your Biography now
                </button>
            );
        }
    }
}
