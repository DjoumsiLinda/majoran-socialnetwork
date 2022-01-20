import "./css/ProfilePicture.css";

export default function ProfilePicture(props) {
    return (
        <div id="profile">
            <img
                className="profile-picture"
                src={props.picture || "/assets/logo.png"}
                alt={`${props.firstname} ${props.lastname}`}
                onClick={() => props.componentVisible(props.picture)}
            />
        </div>
    );
}
