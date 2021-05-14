//import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component.js';
import Home from './components/home.component';
import Login from './components/login.component.js';

//import Coach from './components/user/coach/coach.users.component';
//import CoachUsers from './components/user/coach/coach.users.component.js';
//import CoachRegister from './components/user/coach/coach.register.component.js';
//
//import Register from './components/user.register.component.js'; // need to delete.
//import User from './components/user/user.component.js';
//import { UserContext } from "./UserContext";
function App() {

  //const [userToken, setUserToken] = useState('NOT CONNECTED');
  //const [user, setUser] = useState(null);
  const userFirstName = sessionStorage.getItem('user-firstName');
  const userLastName = sessionStorage.getItem('user-lastName');
  const userToken = sessionStorage.getItem('auth-token') ? `CONNECTED: ${userFirstName} ${userLastName}` : 'NOT CONNECTED';
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') ? true : false;

  const user = {
    firstName: sessionStorage.getItem('user-firstName'),
    lastName: sessionStorage.getItem('user-lastName'),
    role: sessionStorage.getItem('role'),
    isLoggedIn: sessionStorage.getItem('isLoggedIn') ? true : false,
  };
  return (
    <Router>
      <div className="container">
        <Navbar user={user}/>
        <br/>
        <Route path="/home" exact component={Home} />
        {/* <Route path="/user/login" exact component={Login} />  */}
        {/* <Route path="/login" exact component={Login}/> */} 
        <Route path="/login" exact component={() => <Login user={user}/>}/> 
      </div>
    </Router>
    //<UserContext.Provider>
    //</UserContext.Provider>
    //<Route path="/user" exact component={User} />
    //<Route path="/coach" exact component={Coach} />
    //<Route path="/coach/users" exact component={CoachUsers} />
    //<Route path="/coach/register" exact component={CoachRegister} />

    //<Route path="/user/register" exact component={Register} />
  );
}

export default App;
