import { Button } from 'bootstrap';
import React, { Component, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


export default class Navbar extends Component {
  render() {
    /* const userFirstName = sessionStorage.getItem('user-firstName');
    const userLastName = sessionStorage.getItem('user-lastName');
    const userToken = sessionStorage.getItem('auth-token') ? `CONNECTED: ${userFirstName} ${userLastName}` : 'NOT CONNECTED'; */

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">  
          <Link to="/home" className="navbar-brand">Home</Link>
          <div className="collpase navbar-collapse">
          
          <ul className="navbar-nav mr-auto">
            
            <li className="navbar-item">
              <Link to="/user" className="nav-link">User</Link>
            </li>

            <li className="navbar-item">
              <Link to="/coach" className="nav-link">Coach</Link>
            </li>

            <li className="navbar-item">
              <Link to="/coach/users" className="nav-link">CoachUsers</Link>
            </li>

            <li className="navbar-item">
              <Link to="/coach/register" className="nav-link">CoachRegister</Link>
            </li>

            {/* <li className="navbar-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li> */}
            
            <li className="navbar-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
        
            {/* <li className="navbar-item login" id="login">
              <button className="btn btn-primary btn-block" onLoad={}>isLoggedIn: false</button>
            </li> */}

            
{/*             <button className="btn btn-primary btn-block">{this.props.userToken}</button>
 */}          </ul>
          </div>
          <div>
            {/* <button className="btn btn-primary btn-block" id="">Hi {this.props.user.firstName} {this.props.user.lastName}!</button> */}
            <UserWindow user={this.props.user}/>
          </div>
          
        </nav>
      );
    }
}

class UserWindow extends Component{
  render() {
    const logout = () => {
      sessionStorage.clear();
      window.location = '/home';
    }
    const buttonStyle = {
      backgroundColor: '#e01236', 
      border: 0,
      display: "flex",
      justifyContent: "center",
    };
    //const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const isLoggedIn = this.props.user.isLoggedIn;
    const fullName = `${this.props.user.firstName} ${this.props.user.lastName}`
    if(isLoggedIn){
      return (
        //<div>
        // <button className="btn btn-primary btn-block" id="">
        //    {/* <Link to="/register" className="nav-link"> */}
        //    Hi {this.props.user.firstName} {this.props.user.lastName}!
        //    {/* </Link> */}
        //  </button>
        //</div>
        
        <div>
          <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#myModal" style={buttonStyle}>
            Hi {fullName}!
          </button>

          <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
    
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">{fullName}</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <Card style={{ width: '100%' }}>
                  <Card.Img variant="top" src=""/>
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of
                      the card's content.
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    {/* <Card.Link href="#" style={buttonStyle}>Card Link</Card.Link>
                    <Card.Link href="#" style={buttonStyle}>Another Link</Card.Link> */}
                    
                    <Link to="/home" onClick={logout} className="btn btn-primary" data-dismiss="modal" style={buttonStyle}>Log Out</Link>
                  </Card.Body>
                </Card>                                      
              </div>
            </div>
          </div>
        </div>
      );
    }
    else{
      return (
        <div>
            <Link to="/login" className="btn btn-primary" style={buttonStyle}>            
              Please Login
            </Link>
        </div>
      );
    }
  }
}

