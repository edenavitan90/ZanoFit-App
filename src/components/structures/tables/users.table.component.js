import React, { Component, useState } from 'react';
import Table from 'react-bootstrap/Table';
import "bootstrap";
import { VscTrash, VscEdit } from "react-icons/vsc";
import axios from 'axios';
import moment from 'moment';
// style 
import '../../../css_style/VerticalNavbarStyle.css';

export default class UsersTable extends Component {
    render() {
        return (
            <div>
                <CreateTable users={this.props.users} userdetails={this.props.userdetails}/>
            </div>
        )
    }
}

function CreateTable(props) {
    return (
        <div>
            <Table responsive="xl" striped bordered hover className="table table-dark" id=''>
                <RenderTableHeader/>
                <tbody>
                    <RenderTableData users={props.users} userdetails={props.userdetails}/>
                </tbody>
            </Table>
        </div>
    ); 
}
 
function RenderTableHeader() {
    return (
        <thead>
            <tr>
                <th>No.</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Registration Date</th>
                <th>Age</th>
                <th>Role</th>
                <th></th>
            </tr>
        </thead>
    )
}
 
function RenderTableData(props) {
    return props.users.map((user, index) => {
        const { firstName, lastName, email, phoneNumber, registrationDate, dateOfBirth, role } = user // destructuring
        return (
            <tr key={email}>
                <th style={{color:"white"}}>
                    {index + 1}
                </th>
                <td>{firstName + " " + lastName}</td>
                <td>{email}</td>
                <td>{phoneNumber}</td>
                {/* <td>{registrationDate.format('dd/mm/yy')}</td> 
                <td>{(new Date(registrationDate)).format('JER')}</td>*/}
                <td>{moment(registrationDate).format("DD/MM/YYYY")} -- {( moment(new Date()).diff(registrationDate, 'days') / 365 ).toFixed(1)} years</td>
                <td>{( moment(new Date()).diff(dateOfBirth, 'days') / 365 ).toFixed(1)}</td>
                <td>{role[0].toUpperCase() + role.slice(1).toLowerCase()}</td>
                <td style={{padding:"8px"}}>
                    <VscEdit type="button" onClick={deleteUser} style={{color:"white", margin:"6px"}}/>
                    {props.userdetails.user.email != email ? 
                    <VscTrash id={email} type="button" onClick={(e) => askForDeleteUser(e, user)} style={{color:"white", margin:"6px"}}/> : 
                    <VscTrash id={email} type="button" style={{color:"gray", margin:"6px", cursor:'not-allowed'}}/> }
                </td>
            </tr>
        )
    })
}
function askForDeleteUser(e, user) {
    if(window.confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) deleteUser(e, user);
    else {
        // Do nothing for now.
    }
}

function deleteUser(e, user) {
    e.preventDefault();

    const data = {
        email: user.email
    }
    const token = sessionStorage.getItem('auth-token');
    axios.delete('http://localhost:5000/user/coach/delete-user', {
        headers: {
            'auth-token': token
        }, 
        data
    })
    .then(res => { 
        window.location.reload();
        alert("delete");
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