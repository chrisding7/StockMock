import React from "react";

function User({user, firstName, lastName}) {
    return (
        <div className="user-list-tile">
            <h4>{firstName} {lastName}</h4>
            <button>View Profile</button>
            <button>Follow</button>
        </div>
    );
}

export default User;