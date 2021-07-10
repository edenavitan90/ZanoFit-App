import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import UsersTable from '../../structures/tables/users.table.component';
import NotAuthorizedAlert from '../../alerts/NotAuthorizedAlert.component';
import PageNotFoundAlert from '../../alerts/PageNotFoundAlert.component.js';

//import { Link } from 'react-router-dom';

//import { }

export default class Users extends Component{
    constructor(props){
        super(props)
        this.state = {
          users: [],
          loading: true
        }
    }

    async componentDidMount() {
    //async getUsersData() {
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
                    <UsersTable users={this.state.users}/>
                </div>    
            );
            ReactDOM.render(element, document.getElementById('UsersTable'))
            //ReactDOM.render(element, document.getElementById(this.props.target))
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
                <div id="UsersTable"></div>
            </div>
        )
    }
}