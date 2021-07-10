import React, {Component} from 'react';
import NotAuthorizedAlert from '../alerts/NotAuthorizedAlert.component.js';
import PageNotFoundAlert from '../alerts/PageNotFoundAlert.component.js';

export default class User extends Component{
    render(){
        if(!this.props.userdetails.isLoggedIn){
            return(
                <PageNotFoundAlert/>
            );
        }
        else{
            return(
                <div>
                    <p>You are on the User component</p>
                </div>
            )
        }
    }
}