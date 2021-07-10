import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PageNotFoundAlert extends Component{
    render(){
        return(
            <div>
                <br/>
                <div class="alert alert-danger">
                    <strong>404 Error<br/>
                    Page Not Found</strong>
                </div>
            </div>
        );
    }
}