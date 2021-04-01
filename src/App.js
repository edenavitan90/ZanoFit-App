import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component.js';


function App() {
  return (
    <Router>
      <Navbar/>
      <br/>
      {/* <Route path="ZanoFitApp/" exact component={} />
      <Route path="ZanoFitApp/" exact component={} />
      <Route path="ZanoFitApp/" exact component={} />
      <Route path="ZanoFitApp/" exact component={} /> */}
    </Router>
    
  );
}

export default App;
