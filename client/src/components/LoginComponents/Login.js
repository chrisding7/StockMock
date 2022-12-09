import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login({setUser}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    let navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        let path = `/`;
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {email: email, password: password}
            )
        }).then((res) => {
            if (res.ok) {
                res.json().then((userData) => {
                    setUser(userData)
                    navigate(path)
                })
            } else {
                res.json().then((err) => {
                    console.log(err.errors)
                    setErrors(err.errors)
                })
            }
        });
    }

    // console.log(errors)

    const errorMessage = errors.map((err) => {
        return (
            <p className="error-msg-p" key={err}>
                {err}
            </p>
        )
    })

     // console.log(errorMessage);

    return (
        <div>
            <form className="login-form"
                onSubmit={handleSubmit}>
                <header className="form-header">
                    <h2 className="header-text">Welcome!</h2>
                    <p className="header-p">Sign in to start investing</p>
                </header>
                <div className="input-container">
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
                </div>
                <footer className="form-footer">
                    <ul className="error-message">{errorMessage}</ul>
                    <div id="submitbutton">
                        <button type="submit" className="submit-button">
                            <span className="submit-button-content">Log In</span>
                        </button>
                    </div>
                </footer>
            </form>


        </div>
    )
}

export default Login;
