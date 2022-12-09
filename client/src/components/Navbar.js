import React from "react";
import "./Navbar.css"
import logo from '../src/logo.svg';
import {NavLink, useNavigate} from "react-router-dom";

function Navbar({user, setUser, profileUser, setProfileUser}) {

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
                <ul className="nav-list">
                    <li>
                        <div className="nav-logo">
                        <img src={logo}
                            className="nav-Stock-Mock-logo"
                            alt="StockMock"/>
                        </div>
                    </li>
                    <li>
                        <NavLink to='/' style={({isActive}) => ({
                            color: isActive ? '#29e020' : '#ffffff',
                            background: isActive ? '#282c34' : '#1c1e21'
                            })}>Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/market' style={({isActive}) => ({
                            color: isActive ? '#29e020' : '#ffffff',
                            background: isActive ? '#282c34' : '#1c1e21',
                            })}>Market
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/users' style={({isActive}) => ({
                            color: isActive ? '#29e020' : '#ffffff',
                            background: isActive ? '#282c34' : '#1c1e21'
                            })}>Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/myprofile' style={({isActive}) => ({
                            color: isActive ? '#29e020' : '#ffffff',
                            background: isActive ? '#282c34' : '#1c1e21'
                            })}>Profile
                        </NavLink>
                    </li>
                    <li className="nav-user-list">
                        <div className="nav-user">
                            <span>Welcome, {user.first_name}!</span>
                            <button className="logout-btn"
                                onClick={handleLogout}>Logout
                            </button>
                        </div>
                    </li>
                </ul>               
        </div>
    )
}

export default Navbar;
