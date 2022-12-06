import React, {useState} from "react";

function User({user, thisUser, firstName, lastName, followings, follows}) {

    const userId = thisUser.id
    let followingsIds = followings.map((oneUser) => oneUser.id)
    const [showFollow, setShowFollow] = useState(!followingsIds.includes(userId));
    const isMe = user.id === thisUser.id
    
    // console.log(followings.map((oneUser) => oneUser.id))
    // console.log(follows)
    // console.log(follows.find(({follower_id, followed_user_id}) => follower_id === user.id && followed_user_id === userId))

    function handleFollow() {
        // if showFollow true, post create follow, if showFollow false, delete follow
        if (showFollow) {
            console.log("added follow")
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
            console.log("unfollowed")
            const unfollowId = follows.find(({follower_id, followed_user_id}) => follower_id === user.id && followed_user_id === userId).id
            fetch(`/follows/${unfollowId}`, {
                method: "DELETE"
            })
            setShowFollow(() => !showFollow)
        }
        window.location.reload()
    }

    return (
        <div className="user-list-tile">
            <h4>{firstName} {lastName}</h4>
            <button>View Profile</button>
            {isMe? (null):(<button onClick={handleFollow}>{showFollow? "Follow" : "Unfollow"}</button>)}
        </div>
    );
}

export default User;