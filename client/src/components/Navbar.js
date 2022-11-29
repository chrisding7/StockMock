import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
    // function handleLogout() {
    //     useNavigate("/login");
    //     console.log('after redirect');
    //     setUser(null);
    //     console.log('after setUser');

    // }

    let navigate = useNavigate(); 
    function handleLogout() {
        setUser(null);
        let path = `/login`; 
        navigate(path);
    }

    return(
        <div className="nav-container">
            <NavLink to='/'>Home</NavLink>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Navbar;