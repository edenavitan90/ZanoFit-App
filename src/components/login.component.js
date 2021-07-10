//import React, {Component, useState,useContext, createContext } from 'react';
import axios from 'axios';
//import { Route, Redirect } from 'react-router'
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'

//import React, { useState } from "react";
//import { connect } from "react-redux";
import reactDom from 'react-dom';

export default class Login extends Component{
    
  handleLoginSubmit = (e) => {
      e.preventDefault();
      
      let emailAsterisk = document.getElementById("emailAsterisk");
      let passwordAsterisk = document.getElementById("passwordAsterisk");
      reactDom.findDOMNode(emailAsterisk).style.visibility = this.email === undefined ? "visible" : "hidden";
      reactDom.findDOMNode(passwordAsterisk).style.visibility = this.password === undefined ? "visible" : "hidden";
      if(this.email === undefined || this.password === undefined){
        alert("מלא את כל הפרטים לביצוע ההתחברות.");
        return;
      }
      
      const data = {
        email: this.email,
        password: this.password
      };
      //console.log(data);
      axios.post('http://localhost:5000/user/login', data)
      .then(res => { 
        sessionStorage.setItem('isLoggedIn', true);
        sessionStorage.setItem('auth-token', res.data.token);
        sessionStorage.setItem('user', JSON.stringify(res.data.user));

        /* sessionStorage.setItem('user-firstName', res.data.firstName);
        sessionStorage.setItem('user-lastName', res.data.lastName);
        sessionStorage.setItem('user-role', res.data.role); */
        return window.location = '/home';
      })     
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code.
          alert(error.response.data);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } 
        else if (error.request) {
          // The request was made but no response was received, `error.request`.
          console.log(error.request);
        } 
        else {
          // Something happened in setting up the request and triggered an Error
          console.log('Error', error.message);
        }
      })
  };
  
  render(){
    const buttonStyle = {
      backgroundColor: '#e01236', 
      border: 0,
      display: "flex",
      justifyContent: "center",
    };
    if(!this.props.userdetails.isLoggedIn){
      return(
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Please Log In</h4>
            </div>
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src=""/>
              <ListGroup className="list-group-flush">
                <form /* onSubmit={this.handleLoginSubmit} */ style={{margin:'25px'}}>
                  <div style={{margin:'10px'}}>
                    <div className="form-group" style={{margin:'10px'}}>
                      <label id="emailAsterisk" style={{color:"red", fontWeight: 'bold', marginRight: "5px", visibility: "hidden"}}>* </label>
                      <label >Email</label>
                      <input type="email" className="col form-control" placeholder="Email" onChange = {e => this.email = e.target.value} style={{float: 'right', width: '80%'}}/>
                    </div>
                    <div className="form-group" style={{margin:'10px'}}>
                      <label id="passwordAsterisk" style={{color:"red", fontWeight: 'bold', marginRight: "5px", visibility: "hidden"}}>* </label>
                      <label>Password</label>
                      <input type="password" className="form-control" placeholder="Password" onChange = {e => this.password = e.target.value} style={{float: 'right', width: '80%'}}/>
                    </div>
                  </div>
                  {/* <button className="btn btn-primary btn-block" style={buttonStyle}>Log In</button> */}
                  <Button variant="danger" onClick={this.handleLoginSubmit} /* className="btn btn-primary btn-block" */  style={{width:'100%', marginTop:'10px'}}>Log In</Button>{' '}
                </form>
              </ListGroup>
            </Card>                                      
          </div>
        </div>
      );
    }
    else{
      const fullName = `${this.props.userdetails.user.firstName} ${this.props.userdetails.user.lastName}`
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