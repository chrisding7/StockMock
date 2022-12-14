import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Signup({setUser}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);

    let navigate = useNavigate();
    let path = `/`;

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation,
                    buying_power: 10000
                }
            )
        }).then((res) => {
            if (res.ok) {
                res.json().then((userData) => {
                    setUser(userData)
                    navigate(path)
                });
            } else {
                res.json().then((err) => setErrors(err.errors))
            }
        });
    }

    const errorMessage = errors.map((err) => {
        return (
            <p className="error-msg-p" key={err}>
                {err}
            </p>
        )
    });

    return (
        <div>
            <form className="signup-form"
                onSubmit={handleSubmit}>
                <header className="form-header">
                    <h3 className="header-text">Start Investing Now!</h3>
                </header>
                <div className="input-container">
                    <div className="name-input-container">
                        <div className="first-name">
                            <label className="label" htmlFor="firstName">First Name</label>
                            <input type="text" className="first-name-input"
                                value={firstName}
                                onChange={
                                    (e) => setFirstName(e.target.value)
                                }/>
                        </div>
                        <div className="last-name">
                            <label className="label" htmlFor="lastName">Last Name</label>
                            <input type="text" className="last-name-input"
                                value={lastName}
                                onChange={
                                    (e) => setLastName(e.target.value)
                                }/>
                        </div>
                    </div>
                    <div className="username-login">
                        <label className="label" htmlFor="email">Email</label>
                        <input type="text" className="email-input"
                            value={email}
                            onChange={
                                (e) => setEmail(e.target.value)
                            }/>
                    </div>
                    <div className="password-login">
                        <label className="label" htmlFor="password">Password</label>
                        <input type="password" className="password-input"
                            value={password}
                            onChange={
                                (e) => setPassword(e.target.value)
                            }/>
                    </div>
                    <div className="password-confirmation">
                        <label className="label" htmlFor="password">Confirm Password</label>
                        <input type="password" className="password-input"
                            value={passwordConfirmation}
                            onChange={
                                (e) => setPasswordConfirmation(e.target.value)
                            }/>
                    </div>
                </div>
                <footer className="form-footer">
                <ul className="error-message">
                {errorMessage}</ul>
                    <div id="submitbutton">
                        <button type="submit" className="submit-button">
                            <span className="submit-button-content">Sign Up</span>
                        </button>
                    </div>
                </footer>
            </form>
            
        </div>
    )
}

export default Signup;
