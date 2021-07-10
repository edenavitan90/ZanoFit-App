//import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import backgroundImage from './images/image1.png';

import Navbar from './components/navbar.component.js';
import Home from './components/home.component.js';
import About from './components/about.js';
import Login from './components/login.component.js';
import Users from './components/user/coach/coach.users.component.js';
import User from './components/user/user.component.js';
import CoachRegister from './components/user/coach/coach.register.component.js';
import ManageUsers from './components/user/coach/manage.users.component';
import EditUser from './components/user/coach/coach.edit.user.component.js';
import Calendar from './components/calendar/calendar.component.js';

import Loader from "react-loader-spinner";

//import NotAuthorizedAlert from './components/alerts/NotAuthorizedAlert.component';
//import PageNotFoundAlert from './components/alerts/PageNotFoundAlert.component.js';

//import Coach from './components/user/coach/coach.users.component';
//import CoachUsers from './components/user/coach/coach.users.component.js';
//import CoachRegister from './components/user/coach/coach.register.component.js';
//

//import { UserContext } from "./UserContext";
function App() {

  //const [userToken, setUserToken] = useState('NOT CONNECTED');
  //const [user, setUser] = useState(null);
  
  //import Register from './components/user/coach/coach.register.component'; 

  const user = JSON.parse(sessionStorage.getItem('user'));
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') ? true : false;
  
  //const userToken = sessionStorage.getItem('auth-token') ? `CONNECTED: ${user.firstName} ${user.lastName}` : 'NOT CONNECTED'; // Needed?

  const userdetails = {
    user: user,
    isLoggedIn: isLoggedIn,
  };
  return (
    <Router>
      <div className="container-fluid" style={{ backgroundImage: `url(${backgroundImage})`, height:"1000px", backgroundRepeat: "no-repeat",backgroundPosition: "center", backgroundSize: "cover"}}>
        <div className="container">
          <Navbar userdetails={userdetails} />
          <Route path="/home" exact component={Home} />
          <Route path="/about" exact component={About} />
          {/* <Route path="/login" exact component={Login}/> */} 
          <Route path="/login" exact component={() => <Login userdetails={userdetails}/>}/> 
          <Route path="/users" exact component={() => <Users userdetails={userdetails}/>}/> 
          <Route path="/register" exact component={() => <CoachRegister userdetails={userdetails}/>}/>
          <Route path="/manage-users" exact component={() => <ManageUsers userdetails={userdetails}/>}/>
          <Route path="/edit-user" exact component={() => <EditUser userdetails={userdetails}/>}/>
          <Route path="/user" exact component={() => <User userdetails={userdetails}/>}/>
          <Route path="/calendar" exact component={() => <Calendar userdetails={userdetails}/>}/>
          
          <br/><br/>
          <div style={{display:"flex", justifyContent:"center"}}>
            <Loader type="BallTriangle" color="#dc3545" height={80} width={80}/>
            <br/><br/>
            <Loader type="Bars" color="#dc3545" height={80} width={80} />
          </div>
          


        </div>
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
