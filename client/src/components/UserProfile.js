import React from "react";
import ProfileStockList from "./ProfileStockList";

function UserProfile({profileUser}) {
    console.log(profileUser)

    return(
        <div className="user-profile-container">
            <div>
                <h1>{profileUser.first_name} {profileUser.last_name}</h1>
            </div>
            <div>
                <h4>Followers: {profileUser.followers.length}</h4>
                <h4>Following: {profileUser.followings.length}</h4>
            </div>
            <div className="portfolio-container">
                <ProfileStockList user={profileUser} stocks={profileUser.stocks}/>
            </div>
        </div>
    )
}

export default UserProfile;