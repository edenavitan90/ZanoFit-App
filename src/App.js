import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component.js';
import Coach from './components/coach.component.js';
import Login from './components/user.login.component.js';
import Register from './components/user.register.component.js';

function App() {
  return (
    <Router>
      <Navbar/>
      <br/>
      <Route path="/coach" exact component={Coach} />
      <Route path="/user/login" exact component={Login} />
      <Route path="/user/register" exact component={Register} />

      {/* <Route path="/" exact component={} />
      <Route path="/" exact component={} /> */}
    </Router>
    
  );
}

export default App;
