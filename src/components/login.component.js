//import React, {Component, useState,useContext, createContext } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router'
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

//import React, { useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
//import { connect } from "react-redux";
//import { login } from "../actions/auth";
//import { login } from "../../backend/routes/auth";
import MuiAlert from "@material-ui/lab/Alert";

export default class Login extends Component{
    
  handleLoginSubmit = (e) => {
      e.preventDefault();

      const data = {
          email: this.email,
          password: this.password
      };
      console.log(data);

      axios.post('http://localhost:5000/user/login', data)
      .then(res => { 
        console.log(res.data);
        
        sessionStorage.setItem('isLoggedIn', true);
        sessionStorage.setItem('auth-token', res.data.token);
        sessionStorage.setItem('user-firstName', res.data.firstName);
        sessionStorage.setItem('user-lastName', res.data.lastName);
        sessionStorage.setItem('user-role', res.data.role);
        
        //const userFirstName = sessionStorage.getItem('user-firstName');
        //const userLastName = sessionStorage.getItem('user-lastName');
        
        //console.log(userFirstName);
        //console.log(userLastName);

        return window.location = '/home';
      })     
      .catch(err => { console.log(err)})
  };
  
  render(){
    const buttonStyle = {
      backgroundColor: '#e01236', 
      border: 0,
      display: "flex",
      justifyContent: "center",
    };
    if(!this.props.user.isLoggedIn){
      return(
        <form onSubmit = {this.handleLoginSubmit}>
            <h3>Login:</h3>

            <div className="from-group">
                <label>Email</label>
                <input type="email" className="from-control" placeholder="Email"
                        onChange = {e => this.email = e.target.value} />
            </div>

            <div className="from-group">
                <label>Password</label>
                <input type="password" className="from-control" placeholder="Password"
                        onChange = {e => this.password = e.target.value} />
            </div>

            <button className="btn btn-primary btn-block">Login</button>
        </form>
      );
    }
    else{
      const fullName = `${this.props.user.firstName} ${this.props.user.lastName}`
      return(
        <div>
          <div>
            <div class="modal-dialog">
              <div class="modal-content">
                <Card style={{ width: '100%' }}>
                  <Card.Body>
                    <Card.Text>
                        {fullName} - you are already logged in
                    </Card.Text>
                  </Card.Body>
                  <Card.Body>
                    <Link to="/home" className="btn btn-primary" data-dismiss="modal" style={buttonStyle}>Ok</Link>
                  </Card.Body>
                </Card>                                      
              </div>
            </div>
          </div>
        </div>
      );
    } 
  }
}




// ----------------------------------------------------------------------------------
/* function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default connect(null, { login })(props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const submitForm = () => {
      if (email === "" || password === "") {
        setError("Fields are required");
        return;
      }
      props.login({ email, password });
    };

    return (
        <form>
          <Typography variant="h5" style={{ marginBottom: 8 }}>
            Login
          </Typography>
          <TextField label="Email" variant="outlined" fullWidth className="form-input" value={email}
                    onChange={e => setEmail(e.target.value)} />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            className="form-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="form-input"
            size="large"
            onClick={submitForm}
          >
            Login
          </Button>
    
          {error && (
            <Alert severity="error" onClick={() => setError(null)}>
              {props.error || error}
            </Alert>
          )}
        </form>
      );
    });
 */
// ==========================================================================================

// ----------------------------------------------------------------------------------
/* import React, { Component } from "react";

export default class Login extends Component {
    render() {
        return (
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
} */
// ==========================================================================================