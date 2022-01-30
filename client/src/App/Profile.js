import "../css/Profile.css";

import BioEditor from "./BioEditor.js";
import ProfilePicture from "./ProfilePicture.js";

export default function Profile(props) {
    return (
        <section className="profile">
            {/* prop drilling: passing props from
                parent -> child -> grandchild -> ...*/}
            <div id="left">
                <ProfilePicture
                    picture={props.picture}
                    first={props.first}
                    last={props.last}
                    email={props.email}
                    componentVisible={props.componentVisible}
                />
            </div>
            <div id="right">
                <h2>
                    {props.first} {props.last}
                </h2>
                <BioEditor bio={props.bio} setbio={props.setbio} />
            </div>
        </section>
    );
}
