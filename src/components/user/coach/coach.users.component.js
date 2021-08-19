import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import UsersTable from '../../structures/tables/users.table.component';
import NotAuthorizedAlert from '../../alerts/NotAuthorizedAlert.component';
import PageNotFoundAlert from '../../alerts/PageNotFoundAlert.component.js';
import Loader from "react-loader-spinner";

export default class Users extends Component{
    constructor(props){
        super(props)
        this.state = {
          users: [],
          loading: true
        }
    }

    async componentDidMount() {
        axios.get('http://localhost:5000/user/coach/users', {
            headers: {
                'auth-token': sessionStorage.getItem('auth-token')
            }
        })
        .then(res => { 
            this.state.users = res.data;
            this.state.loading = false;
            console.log(this.state.users); console.log(this.state.users.length);
            const element = (
                <div>
                    <div className="modal-header">
                        <h3 className="modal-title">Users View</h3>
                    </div>
                    <UsersTable users={this.state.users} userdetails={this.props.userdetails} style={{overflow: 'auto'}}/>
                </div>    
            );
            ReactDOM.render(element, document.getElementById('UsersTable'))
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
    }
    render(){
        return(
            <div>
                <div id="UsersTable" style={{display:'flex', justifyContent:'center'}}>
                    <Loader type="BallTriangle" color="#dc3545" height={80} width={80} />
                </div>
            </div>
        )
    }
}