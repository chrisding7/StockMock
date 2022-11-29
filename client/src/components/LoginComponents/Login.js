import React from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser, setShowLogin}) {

    let navigate = useNavigate(); 

    function handleSubmit(e) {
        e.preventDefault();
        // console.log("login");
        setUser("Chris");
        let path = `/`; 
        navigate(path);
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <header className="form-header">
                <span className="header-text">Log into StockMock</span>
            </header>
            <div className="input-container">
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
                        <span className="submit-button-content">Log In</span>
                    </button>
                </div>
                
            </footer>
        </form>
    )
}

export default Login;