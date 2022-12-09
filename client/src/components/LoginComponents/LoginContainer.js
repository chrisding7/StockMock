import React, {useState} from "react";
import Login from "./Login";
import Signup from "./Signup";
// import cashLogo from '/Users/cding/Development/code/phase-5/StockMock/client/src/cash-icon.svg';
// import logo from '/Users/cding/Development/code/phase-5/StockMock/client/src/logo.svg';
import logo from '.src/logo.svg';
import cashLogo from '.src/logo.svg';
import {Link} from "react-router-dom";

function LoginContainer({
    setUser
}) {
    const [showLogin, setShowLogin] = useState(true);

    return (<div className="login-container">
        <div className="blur">
        <div className="login-window">
            <img src={logo}
                className="Stock-Mock-logo"
                alt="StockMock"/>
            <img src={cashLogo}
                className="App-logo"
                alt="Logo"/> {showLogin? (
                            <div>
                                <Login setUser={setUser}/>
                                <div className="to-signup-tag">
                                    <span className="tag-text">Don't have an account? </span>
                                    <Link to='/signup' className="signup-link" onClick={() => setShowLogin(false)}>
                                        Sign Up
                                    </Link>
                                </div>      
                            </div>   
                        ):(
                            <div>
                                <Signup setUser={setUser}/>
                                <div className="to-signup-tag">
                                    <span className="tag-text">Already have an account?</span>
                                    <Link to='/login' className="signup-link" onClick={() => setShowLogin(true)}>
                                        Log In
                                    </Link>
                                </div>      
                            </div> 
                        )}
                    </div>
                </div>
        
            </div>
        )
    }

export default LoginContainer;
