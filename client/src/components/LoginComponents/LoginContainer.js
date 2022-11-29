import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Login";
import cashLogo from '/Users/cding/Development/code/phase-5/StockMock/client/src/cash-icon.svg';
import logo from '/Users/cding/Development/code/phase-5/StockMock/client/src/logo.svg';
import { Link } from "react-router-dom";

function LoginContainer({ setUser }) {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="App">
            <img src={logo}
                className="Stock-Mock-logo"
                alt="StockMock"/>
            <img src={cashLogo}
                className="App-logo"
                alt="Logo"/>
            
            {showLogin? (
                <div>
                    <Login setUser={setUser}  setShowLogin={setShowLogin}/>
                    <div id="signup-tag">
                        <span>Don't have an account?</span>
                        <Link to='/signup' onClick={() => setShowLogin(false)} component={<Signup/>}>
                            Sign Up
                        </Link>
                    </div>      
                </div>   
            ):(
                <div>
                    <Signup setUser={setUser}  setShowLogin={setShowLogin}/>
                    <div id="login-tag">
                        <span>Already have an account?</span>
                        <Link to='/login' onClick={() => setShowLogin(true)} component={<Login/>}>
                            Log In
                        </Link>
                    </div>      
                </div> 
            )}
        </div>
    )
}

export default LoginContainer;