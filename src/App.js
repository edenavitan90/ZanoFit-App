import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component.js';
import Home from './components/home.component';
import Coach from './components/user/coach/coach.users.component';
import CoachUsers from './components/user/coach/coach.users.component.js';
import CoachRegister from './components/user/coach/coach.register.component.js';
import Login from './components/login.component.js';
import Register from './components/user.register.component.js'; // need to delete.
import User from './components/user/user.component.js';
import { UserContext } from "./UserContext";
function App() {

  const [userToken, setUserToken] = useState();
  const [user, setUser] = useState(null);


  return (
    <Router>
      <UserContext.Provider>
        <div className="container">
          <Navbar/>
            <br/>
            <Route path="/home" exact component={Home} />
            <Route path="/user" exact component={User} />
            <Route path="/coach" exact component={Coach} />
            <Route path="/coach/users" exact component={CoachUsers} />
            <Route path="/coach/register" exact component={CoachRegister} />
            <Route path="/user/login" exact component={Login} />
            <Route path="/user/register" exact component={Register} />
        </div>
      </UserContext.Provider>
    </Router>
    
  );
}

export default App;
