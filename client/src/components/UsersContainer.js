import React, {useState, useEffect} from "react";
import User from "./User";

function UsersContainer({user}) {
    const [users, setUsers] = useState([]);
    const [followings, setFollowings] = useState([]);
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
        })
    }, []);

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
                follows={
                    follows
                }/>
        )
    });

    const renderFollowings = followings.map((thisUser) => {
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
                follows={
                    follows
                }/>
        )
    });
    
    return (
        <div>
            <h1>Users</h1>
            <div className="users-list-body-container">
                <div className="all-users-list">
                    <h2 className="users-list-header">All Users</h2>
                    <input className="users-search-bar" type="search" placeholder="Search Users"></input>
                    <ul className="users-list">
                        {renderUsers} </ul>
                </div>
                <div className="users-following-list">
                    <h2 className="following-list-header">Following</h2>
                    <input className="following-search-bar" type="search" placeholder="Search Following"></input>
                    <ul className="following-list">
                        {renderFollowings} </ul>
                </div>
            </div>
        </div>
    )
}

export default UsersContainer;
