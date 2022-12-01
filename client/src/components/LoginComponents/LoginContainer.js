import React, {useState} from "react";
import Login from "./Login";
import Signup from "./Login";
import cashLogo from '/Users/cding/Development/code/phase-5/StockMock/client/src/cash-icon.svg';
import logo from '/Users/cding/Development/code/phase-5/StockMock/client/src/logo.svg';
import {Link} from "react-router-dom";

function LoginContainer({
    setUser,
    firstName,
    lastName,
    setFirstName,
    setLastName
}) {
    const [showLogin, setShowLogin] = useState(true);

    return (<div className="App">
        <img src={logo}
            className="Stock-Mock-logo"
            alt="StockMock"/>
        <img src={cashLogo}
            className="App-logo"
            alt="Logo"/> {showLogin? (
                                <div>
                                    <Login setUser={setUser}/>
                                    <div id="to-signup-tag">
                                        <span>Don't have an account?</span>
                                        <Link to='/signup' onClick={() => setShowLogin(false)}>
                                            Sign Up
                                        </Link>
                                    </div>      
                                </div>   
                            ):(
                                <div>
                                    <Signup setUser={setUser} firstName={firstName} lastName={lastName} setFirstName={setFirstName} setLastName={setLastName}/>
                                    <div id="to-login-tag">
                                        <span>Already have an account?</span>
                                        <Link to='/login' onClick={() => setShowLogin(true)}>
                                            Log In
                                        </Link>
                                    </div>      
                                </div> 
                            )}
                        </div>
            )
        }

export default LoginContainer;
