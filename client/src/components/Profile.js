import React from "react";

function Profile({user}) {
    console.log(user)
    return (
        <div>
            <h1>My Profile</h1>
            <div className="profile-container">
                <div className="purchase-history-container">
                    <h2 className="purchase-history-header">Purchase History</h2>
                    <div className="add-funds-button">
                        <button type="button">Add Funds</button>
                    </div>
                    <ul>transactions go here</ul>
                </div>
                <div className="profile-right-half">
                    <div className="profile-info-container">
                        <h4>{user.email}</h4>
                        <p>{user.first_name} {user.last_name}</p>
                    </div>
                    <div className="follows-box">
                        <h4>Followers:
                        </h4>
                        <h4>Following:
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
