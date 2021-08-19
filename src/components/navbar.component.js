import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import Clock from 'react-live-clock';
import './../index.css';
import Modal from 'react-bootstrap/Modal'
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { VscBook, VscCalendar } from "react-icons/vsc";

export default class Navbar extends Component {
  render() {
    const clockStyle = {
      display: "flex",
      justifyContent: "center",
      fontSize: '80%',
      padding: "0",
    };

    return (
        <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-sm">  
          <Link to="/home" className="navbar-brand">Home</Link>
          <div className="collpase navbar-collapse">
          
          <ul className="navbar-nav mr-auto">
            
            <li className="navbar-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>

             <li className="navbar-item">
              <Link to="/user" className="nav-link">User</Link>
            </li>

          </ul>
          <div className="row" style={{display:"flex", justifyContent:"flex-end"}}>
              <Button variant="danger" className="col-5" style={clockStyle}>
                <label style={{margin: 0}}>Time To Workout</label>
                <Clock format={'DD/MM/YYYY hh:mm:ss'} ticking={true} timezone={'Asia/Jerusalem'}/>
              </Button>{' '}

              <div className="col-5 navbar-item">
                <UserWindow userdetails={this.props.userdetails}/>
              </div>
              </div>
            </div>
        </nav>
      </div>
      );
    }
}

function UserdModal(props) {
  const logout = () => {
    sessionStorage.clear();
    window.location = '/home';
  }
  const fullName = `${props.userdetails.user.firstName} ${props.userdetails.user.lastName}`;
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Welcome Back To ZanoFit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Modal.Title id="contained-modal-title-vcenter">
          {fullName}
        </Modal.Title>
        <br/>
        <UserdModalFooter userdetails={props.userdetails}/>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="danger" onClick={ logout } style={{float:"right"}}>
          Log Out
        </Button>{' '}
      </Modal.Footer>
    </Modal>
  );
}


function UserWindow(props) {
    const buttonstyle = {
      display: "flex",
      justifyContent: "center",
      color: "white"
    };

    const [modalUserWindow, setModalUserWindow] = useState(false);
    if(props.userdetails.isLoggedIn){
      const fullName = `${props.userdetails.user.firstName} ${props.userdetails.user.lastName}`;
      return (
        <div>
          <Button variant="danger" onClick={() => setModalUserWindow(true)}>{fullName}</Button>{' '}
          <UserdModal show={modalUserWindow} onHide={() => setModalUserWindow(false)} buttonstyle={buttonstyle} userdetails={props.userdetails}/>
        </div>
      );
    }
    else{
      return (
      <div>
        <Button variant="danger">
          <Link to="/login" style={buttonstyle}>            
            Please Login
          </Link>
        </Button>{' '}
      </div>
      );
    }
}


function UserdModalFooter(props) {
  // if Coach
  if(props.userdetails.user.role === "COACH"){
     return (
      <ListGroup className="list-group-flush">
        <ListGroup.Item action onClick={ () => window.location = '/user'}>
          <AiOutlineUser style={{marginRight:"10px"}}/>
          Your Profile
        </ListGroup.Item>
        <ListGroup.Item action onClick={ () => window.location = '/calendar'}>
          <VscCalendar style={{marginRight:"10px"}}/>
          Calendar 
        </ListGroup.Item> 
        <ListGroup.Item action onClick={ () => window.location = '/register'}>
          <AiOutlineUserAdd style={{marginRight:"10px"}}/>
          Registration - New User
        </ListGroup.Item>
        <ListGroup.Item action onClick={ () => window.location = '/manage-users'}>
          <VscBook style={{marginRight:"10px"}}/>
          Manage Users
        </ListGroup.Item>        
      </ListGroup>
    );
  }

  // else if Trainee
  return (
    <ListGroup className="list-group-flush">
      <ListGroup.Item action onClick={ () => window.location = '/user'}>
        <AiOutlineUser style={{marginRight:"10px"}}/>
        Your Profile
      </ListGroup.Item>
      <ListGroup.Item action onClick={ () => window.location = '/calendar'}>
        <VscCalendar style={{marginRight:"10px"}}/>
        Calendar 
      </ListGroup.Item>      
    </ListGroup>
   );
}
