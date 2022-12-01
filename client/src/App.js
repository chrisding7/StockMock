import './App.css';
import LoginContainer from './components/LoginComponents/LoginContainer';
import Market from './components/Market';
import Home from './components/Home.js';
import UsersContainer from './components/UsersContainer.js';
import Profile from './components/Profile.js';
import Navbar from './components/Navbar.js';
import {Route, Routes} from "react-router-dom";
import {useState, useEffect} from "react";

function App() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        fetch("/auth").then((res) => {
            if (res.ok) {
                res.json().then((userData) => setUser(userData));
            }
        });
    }, []);

    

    if (!user) {
        return <LoginContainer setUser={setUser}
            firstName={firstName}
            lastName={lastName}
            setFirstName={setFirstName}
            setLastName={setLastName}/>
    }

    return (
        <div className="App">
            <Navbar user={user}
                setUser={setUser}/>
            <Routes>
                <Route exact path='/'
                    element={<Home user={user}/>}/>
                <Route exact path='/market'
                    element={<Market/>}/>
                <Route exact path='/users'
                    element={<UsersContainer user={user}/>}/>
                <Route exact path='/profile'
                    element={<Profile/>}/>
            </Routes>
        </div>
    );
}

export default App;
