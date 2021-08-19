import axios from 'axios';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
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
                <form style={{margin:'25px'}}>
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
                  <Button variant="danger" onClick={this.handleLoginSubmit} style={{width:'100%', marginTop:'10px'}}>Log In</Button>{' '}
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