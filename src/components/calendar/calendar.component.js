import React, {Component} from 'react';
//import NotAuthorizedAlert from '../alerts/NotAuthorizedAlert.component.js';
import PageNotFoundAlert from '../alerts/PageNotFoundAlert.component.js';

export default class Calendar extends Component{
    render(){
        if(!this.props.userdetails.isLoggedIn){
            return(
                <PageNotFoundAlert/>
            );
        }

        // maybe return one component with different parameters.
        else if(this.props.userdetails.user.role === "TRAINEE"){
            return(
                <div>
                    <p>You are on the User Calendar component</p>
                </div>
            );
        }
        else if(this.props.userdetails.user.role === "COACH"){
            return(
                <div>
                    <p>You are on the Coach Calendar component</p>
                </div>
            );
        }
    }
}