import './App.css';
import LoginContainer from './components/LoginComponents/LoginContainer';
import Login from './components/LoginComponents/Signup';
import Signup from './components/LoginComponents/Login';
import Home from './components/Home.js';
import Navbar from './components/Navbar.js';
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
    const [user, setUser] = useState(null);

    if (!user) {
      return <LoginContainer setUser={setUser}/>
    }

    console.log(user);

    return (
        <div className="App">
          <Navbar user={user} setUser={setUser}/>
            <Routes>
              <Route exact path='/' element={<Home />}/>
              <Route path='/login'element={<Login />}/>
              <Route path='/signup'element={<Signup />}/>
            </Routes>
        </div>
    );
}

export default App;
