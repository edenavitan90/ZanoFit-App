import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class NotAuthorizedAlert extends Component{
    render(){
        return(
            <div>
                <br/>
                <div class="alert alert-danger">
                    <strong>401 Error<br/>
                    {this.props.userdetails.user.firstName} {this.props.userdetails.user.lastName} - You Are Not Authorized</strong>
                </div>
            </div>
        );
    }
}