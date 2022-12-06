import React from "react";
import {NavLink, useNavigate} from "react-router-dom";

function Navbar({user, setUser}) {

    let navigate = useNavigate();

    function handleLogout() {
        let path = `/login`;

        fetch("/logout", {method: "DELETE"}).then((r) => {
            if (r.ok) {
                setUser(null)
            }
        }).then(navigate(path));
    }

    return (
        <div className="nav-container">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/market'>Market</NavLink>
            <NavLink to='/users'>Users</NavLink>
            <NavLink to='/profile'>Profile</NavLink>

            <span>Welcome, {
                user.first_name
            }!</span>
            <button className="logout-btn"
                onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Navbar;
