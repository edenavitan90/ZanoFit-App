import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

// components
import Users from './coach.users.component.js';
import Coach from '../coach/coach.component';
import CoachRegister from './coach.register.component.js';

// style 
import '../../../css_style/VerticalNavbarStyle.css';
import NotAuthorizedAlert from '../../alerts/NotAuthorizedAlert.component';
import PageNotFoundAlert from '../../alerts/PageNotFoundAlert.component.js';

export default class ManageUsers extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modeManageUsers: "Users"
        };
    }

    render(){
        if(!this.props.userdetails.isLoggedIn){
            return(
                <PageNotFoundAlert/>
            );
        }
        else if(this.props.userdetails.user.role === "TRAINEE"){
            return(
              <div>
                <NotAuthorizedAlert userdetails={this.props.userdetails}/>
              </div>
            );
        }
        else if(this.props.userdetails.user.role === "COACH"){
            return(
                <div>
                    <div className="row modal-content" style={{background: 'rgba(255, 255, 255, 0.8)',margin: '0'}}>
                        <Container>
                            <Row>
                                <Col xs={2} style={{padding: '0'}}>
                                    <nav className="navbar-dark navbar-expand-lg">  
                                        <div className="collpase">
                                            <ul id="ul">
                                                <li>
                                                    <Link to="#" onClick={() => this.setState({modeManageUsers: "Users"})}>Users View</Link>
                                                </li>
                                                <li>
                                                    <Link to="#" onClick={() => this.setState({modeManageUsers: "Registration"})}>Registration - New User</Link>
                                                </li>
                                                <li>
                                                    <Link to="#" onClick={() => this.setState({modeManageUsers: "XXXX"})}>Y</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                </Col>
    
                                <Col xs={10}>
                                    <Container fluid>
                                        <RenderManageUsersComponent  userdetails={this.props.userdetails} mode={this.state.modeManageUsers}/>
                                    </Container> 
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            )
        } 
    }
}

function RenderManageUsersComponent(props) {
  
    if(props.mode === "Users"){
        return (
              <div>
                <Users target={"UsersTable"} userdetails={props.userdetails}/>
            </div>
        );
    }
    else if(props.mode === "Registration"){
        return (
            <div>
                <CoachRegister userdetails={props.userdetails}/>
            </div>  
        );
    }
    else{
        return (
            <div>
                <Coach/>
            </div>
        );
    }  
}