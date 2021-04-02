import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {
    render() {
      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          
          <Link to="/home" className="navbar-brand">Home</Link>
          <div className="collpase navbar-collapse">
          
          <ul className="navbar-nav mr-auto">
            
            <li className="navbar-item">
            <Link to="/coach" className="nav-link">Coach</Link>
            </li>

            <li className="navbar-item">
            <Link to="/coach/users" className="nav-link">CoachUsers</Link>
            </li>

            <li className="navbar-item">
            <Link to="/coach/register" className="nav-link">CoachRegister</Link>
            </li>

            <li className="navbar-item">
            <Link to="/user/login" className="nav-link">Login</Link>
            </li>
            
            <li className="navbar-item">
            <Link to="/user/register" className="nav-link">Register</Link>
            </li>
        
          </ul>
          </div>
        </nav>
      );
    }
  }