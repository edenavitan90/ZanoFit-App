//import React, {Component, useState,useContext, createContext } from 'react';
//import axios from 'axios';

import React, { useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default connect(null, { login })(props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const submitForm = () => {
      if (email === "" || password === "") {
        setError("Fields are required");
        return;
      }
      props.login({ email, password });
    };

    return (
        <form>
          <Typography variant="h5" style={{ marginBottom: 8 }}>
            Login
          </Typography>
          <TextField label="Email" variant="outlined" fullWidth className="form-input" value={email}
                    onChange={e => setEmail(e.target.value)} />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            className="form-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="form-input"
            size="large"
            onClick={submitForm}
          >
            Login
          </Button>
    
          {error && (
            <Alert severity="error" onClick={() => setError(null)}>
              {props.error || error}
            </Alert>
          )}
        </form>
      );
    });


















































// export default class Login extends Component{
    
//     handleSubmit = (e) => {

//         e.preventDefault();

//         const data = {
//             email: this.email,
//             password: this.password
//         };

//         const x = axios.post('http://localhost:5000/user/login', data)
//         //.then(respone => callback(response.data))
//         .then(res => {
//             return {
//                 token: res.data.token
//             }
//             //console.log(res.data.token);
//             // console.log(res.data);
//             // return res.data.token;
//             // res.data.token.callback();

//         })     
//         //.catch(err => { console.log(err)})

//         console.log(x + "\neden avitan");

//         const a = axios.get('http://localhost:5000/user/isLoggedIn', {
//             // headers: {
//             //     'auth-token': token
//             // }
//         })
//         .then(res => {console.log(res)})
//         .catch(err => { 
//             //console.log(err)
//             //console.log(token)
//         })
//     };
    
    
//     render(){
//         return(
//             <form onSubmit = {this.handleSubmit}>
                
//                 <h3>Login:</h3>

//                 <div className="from-group">
//                     <label>Email</label>
//                     <input type="email" className="from-control" placeholder="Email"
//                             onChange = {e => this.email = e.target.value} />
//                 </div>

//                 <div className="from-group">
//                     <label>Password</label>
//                     <input type="password" className="from-control" placeholder="Password"
//                             onChange = {e => this.password = e.target.value} />
//                 </div>

//                 <button className="btn btn-primary btn-block">Login</button>

//             </form>
//         )
//     }
// }





