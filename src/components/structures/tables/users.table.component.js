import React, { Component, useState } from 'react';


import Table from 'react-bootstrap/Table';


import "bootstrap";
import Collapsible from 'react-collapsible';
import { VscTrash, VscEdit } from "react-icons/vsc";
//import Collapse from 'react-bootstrap/Collapse';
//import Button from 'react-bootstrap/Button';

//import { Link } from 'react-router-dom';
import axios from 'axios';


//////////////////////
/* import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'; */
//////////////////////


// style 
import '../../../css_style/VerticalNavbarStyle.css';

export default class UsersTable extends Component {
    render() {
        return (
            <div>
                <CreateTable users={this.props.users}/>
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
                    <RenderTableData users={props.users}/>
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
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th></th>
            </tr>
        </thead>
    )
}
 
function RenderTableData(props) {
    return props.users.map((user, index) => {
        const { firstName, lastName, email, phoneNumber, role } = user // destructuring
        return (
            <tr key={email}>
                <th className="btn" style={{display:"flex", justifyContent:"center", color:"white"}}>
                    {index+1}
                </th>
                <td>{firstName + " " + lastName}</td>
                <td>{email}</td>
                <td>{phoneNumber}</td>
                <td>{role}</td>
                <td style={{padding:"8px"}}>
                    <VscEdit type="button" onClick={deleteUser} style={{color:"white", margin:"6px"}}/>
                    <VscTrash id={email} type="button" onClick={(e) => askForDeleteUser(e, user)} style={{color:"white", margin:"6px"}}/>
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