import React, {Component} from 'react';

export default class Home extends Component{
    render(){
        return(
            <div>
                <p>You are on the Home component</p>
                <p>Token: {sessionStorage.getItem('auth-token')}</p>
            </div>

        )
    }
}