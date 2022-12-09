import React, {useState, useEffect} from "react";
import User from "./User";

function UsersContainer({user, profileUser, setProfileUser}) {
    const [users, setUsers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [follows, setFollows] = useState([]);

    useEffect(() => {
        fetch(`/follows`)
        .then((res) => res.json())
        .then((followsData) => {
            setFollows(followsData)
        })
    }, []);

    useEffect(() => {
        fetch(`/users`)
        .then((res) => res.json())
        .then((usersData) => {
            setUsers(usersData)
        })
    }, []);

    useEffect(() => {
        fetch(`/users/${user.id}`)
        .then((res) => res.json())
        .then((userData) => {
            setFollowings(userData.followings)
            setFollowers(userData.followings)
        })
    }, []);
    
    const followings_filter = followings.map(following => following.id)

    const followingArray = users.filter(user => followings_filter.includes(user.id))
    
    const renderUsers = users.map((thisUser) => {
        return (
            <User key={
                    thisUser.id
                }
                user={
                    user
                }
                thisUser={
                    thisUser
                }
                firstName={
                    thisUser.first_name
                }
                lastName={
                    thisUser.last_name
                }
                followings={
                    followings
                }
                followers={
                    followers
                }
                follows={
                    follows
                }
                profileUser={
                    profileUser
                }
                setProfileUser={
                    setProfileUser
                }/>
        )
    });

    const renderFollowings = followingArray.map((thisUser) => { 
        return (
            <User key={
                    thisUser.id
                }
                user={
                    user
                }
                thisUser={
                    thisUser
                }
                firstName={
                    thisUser.first_name
                }
                lastName={
                    thisUser.last_name
                }
                followings={
                    followings
                }
                followers={
                    followers
                }
                follows={
                    follows
                }
                profileUser={
                    profileUser
                }
                setProfileUser={
                    setProfileUser
                }/>
        )
    });


    return (
        <div>
            <div className="users-list-body-container">
                <div className="user-float-child">
                    <h2 className="users-list-header">All Users</h2>
                    <ul className="users-list">
                        {renderUsers} </ul>
                </div>
                <div className="user-float-child">
                    <h2 className="following-list-header">Following</h2>
                    <ul className="users-list">
                        {renderFollowings} </ul>
                </div>
            </div>
        </div>
    )
}

export default UsersContainer;
