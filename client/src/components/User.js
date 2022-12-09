import React, {useState} from "react";
import {Link} from "react-router-dom";

function User({
    user,
    thisUser,
    firstName,
    lastName,
    followings,
    follows,
    setProfileUser
}) {
    const userId = thisUser.id
    let followingsIds = followings.map((oneUser) => oneUser.id)
    const [showFollow, setShowFollow] = useState(! followingsIds.includes(userId));
    const isMe = user.id === thisUser.id

    function handleFollow() { 
        if (showFollow) {
            fetch("/follows", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {follower_id: user.id, followed_user_id: thisUser.id}
                )
            }).then((res) => res.json())
            setShowFollow(() => !showFollow)
        } else {
            const unfollowId = follows.find(({follower_id, followed_user_id}) => follower_id === user.id && followed_user_id === userId).id
            fetch(`/follows/${unfollowId}`, {method: "DELETE"})
            setShowFollow(() => !showFollow)
        }
        window.location.reload()
    }

    return (
        <div className="user-list-tile">
            <Link to="/userprofile" className="user-link"
                onClick={
                    () => setProfileUser(thisUser)
            }>
                {firstName} {lastName}</Link>
            {
            isMe ? (null) : (showFollow ? (
                <button className="follow-button"
                    onClick={handleFollow}>Follow</button>
            ) : (
                <button className="unfollow-button"
                    onClick={handleFollow}>Unfollow</button>
            ))} 
        </div>
    );
}
    
    export default User;
