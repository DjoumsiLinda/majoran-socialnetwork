import "../css/ProfilePicture.css";

export default function ProfilePicture(props) {
    return (
        <div id="profilePicture">
            <img
                className="profile-picture"
                src={props.picture || "/assets/default.jpeg"}
                alt={`${props.first} ${props.last}`}
                onClick={() => props.componentVisible(props.picture)}
                onError={(evt) => {
                    evt.target.src = "/assets/default.jpeg";
                }}
            />
        </div>
    );
}
