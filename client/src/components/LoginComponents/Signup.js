import React from "react";
import {useNavigate} from "react-router-dom";

function Signup({setUser, firstName, lastName, setFirstName, setLastName}) {

    let navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setUser("Chris");
        let path = `/`;
        navigate(path);
    }

    return (
        <form className="signup-form"
            onSubmit={handleSubmit}>
            <header className="form-header">
                <span className="header-text">Sign Up for StockMock</span>
            </header>
            <div className="input-container">
                <div className="first-name">
                    <label className="label" htmlFor="firstName">First Name</label>
                    <input type="text" id="first-name-input"/>
                </div>
                <div className="last-name">
                    <label className="label" htmlFor="lastName">Last Name</label>
                    <input type="text" id="last-name-input"/>
                </div>
                <div className="username-login">
                    <label className="label" htmlFor="username">Email</label>
                    <input type="text" id="username"/>
                </div>
                <div className="password-login">
                    <label className="label" htmlFor="password">Password</label>
                    <input type="password"/>
                </div>
            </div>
            <footer className="form-footer">
                <div id="submitbutton">
                    <button type="submit" className="submit-button">
                        <span className="submit-button-content">Sign Up</span>
                    </button>
                </div>
            </footer>
        </form>
    )
}

export default Signup;
