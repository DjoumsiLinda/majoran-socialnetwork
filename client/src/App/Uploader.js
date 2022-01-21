import { Component } from "react";
import "../css/Uploader.css";
export default class Uploader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.closeBtx = this.closeBtx.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.files[0] });
    }
    handleClick(evt) {
        evt.preventDefault();

        const formData = new FormData();
        formData.append("file", this.state.file);
        fetch("/uploader.json", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    this.setState({ error: true });
                }
            })
            .then((url) => {
                this.props.componentVisible(url);
            });
    }
    closeBtx() {
        this.props.componentVisible();
    }

    render() {
        return (
            <div className="uploader">
                <button id="btx" onClick={this.closeBtx}>
                    X
                </button>
                <div>
                    <form onSubmit={this.handleClick}>
                        <h2>Do you want to change your Profile Picture?</h2>
                        <div className="com">
                            <input
                                type="file"
                                accept="image/*"
                                name="file"
                                onChange={this.handleChange}
                            />
                            <button type="submit">Uplaod</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
