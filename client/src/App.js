import './App.css';
import LoginContainer from './components/LoginComponents/LoginContainer';
import Market from './components/Market';
import Home from './components/Home.js';
import UsersContainer from './components/UsersContainer.js';
import MyProfile from './components/MyProfile.js';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar.js';
import {Route, Routes} from "react-router-dom";
import {useState, useEffect} from "react";

function App() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profileUser, setProfileUser] = useState();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch("/auth").then((res) => {
            if (res.ok) {
                res.json().then((userData) => setUser(userData));
            }
        });
    }, []);

    useEffect(() => {
        fetch("/transactions").then(res => res.json())
        .then(data => setTransactions(data))
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
                    element={<Home user={user} transactions={transactions}/>}/>
                <Route exact path='/market'
                    element={<Market user={user}/>}/>
                <Route exact path='/users'
                    element={<UsersContainer user={user} profileUser={profileUser} setProfileUser={setProfileUser}/>}/>
                <Route exact path='/myprofile'
                    element={<MyProfile user={user}/>}/>
                <Route exact path='/userprofile'
                    element={<UserProfile profileUser={profileUser}/>}/>
            </Routes>
        </div>
    );
}

export default App;
