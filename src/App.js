import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component.js';
import Home from './components/home.component';
import Coach from './components/coach.component.js';
import CoachUsers from './components/coach.users.component.js';
import CoachRegister from './components/coach.register.component.js';
import Login from './components/user.login.component.js';
import Register from './components/user.register.component.js'; // need to delete.

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
          <br/>
          <Route path="/home" exact component={Home} />
          <Route path="/coach" exact component={Coach} />
          <Route path="/coach/users" exact component={CoachUsers} />
          <Route path="/coach/register" exact component={CoachRegister} />
          <Route path="/user/login" exact component={Login} />
          <Route path="/user/register" exact component={Register} />
      </div>
    </Router>
    
  );
}

export default App;
