import React, {Component} from 'react';
import axios from 'axios';
//import Card from 'react-bootstrap/Card';
//import ListGroup from 'react-bootstrap/ListGroup';
//import { Link } from 'react-router-dom';
//import { date } from '@hapi/joi';
//import ReactTooltip from "react-tooltip";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
//import notAuthorizedAlert from '../alerts/notAuthorizedAlert.component.js';
import NotAuthorizedAlert from '../../alerts/NotAuthorizedAlert.component.js';
import PageNotFoundAlert from '../../alerts/PageNotFoundAlert.component.js';
//import { Alert } from '@material-ui/lab';
//import backgroundImage from '../../../images/logo.png'
//import { Icon } from 'semantic-ui-react'
import { VscNote } from "react-icons/vsc";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";

export default class CoachRegister extends Component {

  handleRegistrationDate = (e) => {
    this.registrationDateChoise = e.target.value;
    
    if(this.registrationDateChoise !== "Today"){
      return document.getElementById("ChooseDate").style.display = "block";
    }
    return document.getElementById("ChooseDate").style.display = "none";
  }

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    
   /*  let emailAsterisk = document.getElementById("emailAsterisk");
    let passwordAsterisk = document.getElementById("passwordAsterisk");
    reactDom.findDOMNode(emailAsterisk).style.visibility = this.email === undefined ? "visible" : "hidden";
    reactDom.findDOMNode(passwordAsterisk).style.visibility = this.password === undefined ? "visible" : "hidden"; */
    
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    //const forms = document.querySelectorAll('.needs-validation');
    
    
    /* const forms = document.getElementsByTagName('form');
  
    Array.prototype.slice.call(forms).forEach((form) => {
      
        alert(form);
    }); */

    if(this.confirmPassword.trim() !== this.password.trim()){
      alert("סיסמאות חייבות להיות תואמות");
      return;
    }

    const token = sessionStorage.getItem('auth-token');
      
    var notes = [];
    if(this.notes !== undefined){
      notes = this.notes.split(".");

      for(var i = 0; i < (notes.length || 0); i++){
        notes[i] = notes[i].trim();
        if(notes[i] === ""){
          notes.splice(i,1)
        }
      }
    }
    
    if(this.registrationDate === undefined){
      this.registrationDate = new Date().toLocaleDateString();
    }

    const user = {
      email: this.email.trim(),
      password: this.password.trim(),
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      phoneNumber: this.phoneNumber.trim(),
      dateOfBirth: this.dateOfBirth,
      registrationDate: this.registrationDate,
      trainingPricePerHour: this.trainingPricePerHour.trim(),
      role: this.role,
      notes: notes,
      physicalDetails: {
        gender: this.gender,          
        height: this.height.trim(),
        weight: this.weight.trim()
      }
    };
      
    axios.post('http://localhost:5000/user/register', user, {
      headers: {
        "auth-token": token
      }
    })
    .then(res => {
        console.log(res.data);
        return window.location = '/home';
    })


  }
    render(){
      const buttonStyle = {
        //backgroundColor: '#e01236', 
        //border: 0,
        display: "flex",
        justifyContent: "center",
        float:"right"
      };
      
      if(!this.props.userdetails.isLoggedIn){
        return(
            <PageNotFoundAlert/>
        );
      }
      else if(this.props.userdetails.user.role === "TRAINEE"){
        return(
          <div>
            <NotAuthorizedAlert userdetails={this.props.userdetails}/>
          </div>
        );
      }
      else if(this.props.userdetails.user.role === "COACH"){
        return(
            <div className="modal-content" style={{background: 'rgba(255, 255, 255, 0.8)'}} /* style={{ backgroundImage: `url(${backgroundImage})rgba(255, 51, 51, 0.5)`, height:"1000px", backgroundRepeat: "no-repeat",backgroundPosition: "center", backgroundSize: "cover", background: ''}} */>
              
              <div className="modal-header">
                <h4 className="modal-title">Registration</h4>
              </div>

              <div className="container" style={{margin:'10px'}}>
                <form id="registerForm" className="form-horizontal needs-validation" onSubmit = {this.handleRegisterSubmit} style={{margin:'25px'}}>
                  <div className="form-row">

                    <div className="col-md-2" style={{padding:'5px'}}>
                      <label id="RoleAsterisk" style={{color:"red", fontWeight: 'bold', marginRight: "5px", visibility: "hidden"}}>* </label>
                      <label>Role</label>
                      <select className="custom-select" onChange = {e => this.role = e.target.value}>
                        <option value="-1">Role</option>
                        <option value="COACH">Coach</option>
                        <option value="TRAINEE">Trainee</option>
                      </select>
                    </div>
                      
                    <div className="col-md-2" style={{padding:'5px'}}>
                      <label id="FirstNameAsterisk" style={{color:"red", fontWeight: 'bold', marginRight: "5px", visibility: "hidden"}}>* </label>
                      <label>First Name</label>
                      <input type="text" dir="auto" className="form-control" placeholder="First Name" onChange = {e => this.firstName = e.target.value}/>   
                    </div>

                      <div className="col-md-2" style={{padding:'5px'}}>
                        <label id="LastNameAsterisk" style={{color:"red", fontWeight: 'bold', marginRight: "5px", visibility: "hidden"}}>* </label>
                        <label>Last Name</label>
                        <input type="text" dir="auto" className="form-control" placeholder="Last Name" onChange = {e => this.lastName = e.target.value}/>
                      </div>

                      <div className="col-md-3" style={{padding:'5px'}}>
                        <label id="PhoneNumberAsterisk" style={{color:"red", fontWeight: 'bold', marginRight: "5px", visibility: "hidden"}}>* </label>
                        <label>
                          Phone Number
                          <AiOutlinePhone style={{marginLeft:"5px"}}/>
                        </label>
                        <input type="tel" className="form-control" placeholder="Phone Number" onChange = {e => this.phoneNumber = e.target.value}/>
                      </div>

                      <div className="col-md-3" style={{padding:'5px'}}>
                        <label id="DateOfBirthAsterisk" style={{color:"red", fontWeight: 'bold', marginRight: "5px", visibility: "hidden"}}>* </label>
                        <label>Date Of Birth</label>
                        <input type="date" className="form-control" onChange = {e => this.dateOfBirth = e.target.value}/>
                      </div>

                  </div>
                  <div className="form-row">
                      
                    <div className="col-md-4" style={{padding:'5px'}}>
                      <label id="EmailAsterisk" style={{color:"red", fontWeight: 'bold', marginRight: "5px", visibility: "hidden"}}>* </label>
                      <label>
                        Email
                        <AiOutlineMail style={{marginLeft:"5px"}}/>
                      </label>
                      <input type="email" className="form-control" placeholder="Email" onChange = {e => this.email = e.target.value}/>
                    </div>
                      
                    <div className="col-md-4" style={{padding:'5px'}}>
                      <label id="PasswordAsterisk" style={{color:"red", fontWeight: 'bold', marginRight: "5px", visibility: "hidden"}}>* </label>
                      <label>Password</label>
                      <input type="password" className="form-control" placeholder="Password" onChange = {e => this.password = e.target.value}/>
                    </div>
                      
                    <div className="col-md-4" style={{padding:'5px'}}>
                      <label id="ConfirmPasswordAsterisk" style={{color:"red", fontWeight: 'bold', marginRight: "5px", visibility: "hidden"}}>* </label>
                      <label>Confirm Password</label>
                      <input type="password" className="form-control" placeholder="Confirm Password" onChange = {e => this.confirmPassword = e.target.value}/>
                    </div>
                  </div>  
                  <br/>

                  <div className="form-row">

                    <div className="col-md-2" style={{padding:'5px'}}>
                      <label>Registration Date</label>
                      <select className="custom-select" size="2" onClick={ this.handleRegistrationDate }>
                        <option value="Today" selected >Today</option>
                        <option value="Other Date">Other Date</option>
                      </select>
                    </div>

                    <div className="col-md-2" id="ChooseDate" style={{padding:'5px', display: "none"}}>
                      <label id="ChooseDateAsterisk" style={{color:"red", fontWeight: 'bold', marginRight: "5px", visibility: "hidden"}}>* </label>
                      <label>
                        Choose Date
                      </label>
                      <input type="date" className="form-control" onChange = {e => this.registrationDate = e.target.value}/>
                    </div>

                    <div className="col-md-2" style={{padding:'5px'}}>
                      <label id="PricePerHourAsterisk" style={{color:"red", fontWeight: 'bold', marginRight: "5px", visibility: "hidden"}}>* </label>
                        <label>Price Per Hour</label>
                      <input type="number" step="0.5" className="form-control" min="0" placeholder="Price" onChange = {e => this.trainingPricePerHour = e.target.value}/>
                    </div>
                      
                    {/* <div className="form-group" style={{margin:'0px', marginTop:'40px'}}>
                      <label>&nbsp;&nbsp;Physical Details:</label>
                    </div> */}

                    {/* <div className="form-row"> */}
                    <div className="col-md-2" style={{padding:'5px'}}>
                      <label id="GenderAsterisk" style={{color:"red", fontWeight: 'bold', marginRight: "5px", visibility: "hidden"}}>* </label>
                      <label>Gender</label>
                      <select className="custom-select" id="" onChange = {e => this.gender = e.target.value}>
                        <option value="-1">Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                    </div>

                    <div className="col-md-2" style={{padding:'5px'}}>
                      <label id="HeightAsterisk" style={{color:"red", fontWeight: 'bold', marginRight: "5px", visibility: "hidden"}}>* </label>
                      <label>Height [m]</label>
                      <input type="number" step="0.1" min="0" max="2.5" className="form-control" placeholder="Height" onChange = {e => this.height = e.target.value}/>
                    </div>

                    <div className="col-md-2" style={{padding:'5px'}}>
                      <label id="WeightAsterisk" style={{color:"red", fontWeight: 'bold', marginRight: "5px", visibility: "hidden"}}>* </label>
                      <label>Weight [kg]</label>
                      <input type="number" step="0.5" min="0" max="200" className="form-control" placeholder="Weight" onChange = {e => this.weight = e.target.value}/>
                    </div>

                  </div>

                  <div className="col-md-12" style={{padding:'5px'}}>
                    <label>
                      Notes
                      <VscNote style={{marginLeft:"5px"}}/>
                    </label>
                    <div>
                      <textarea className="form-control" dir="auto" id="notes" placeholder="Write Notes" rows="4" style={{minHeight:"50px", maxHeight:"200px"}} form="registerForm"
                        onChange = {e => this.notes = e.target.value}></textarea>
                    </div>
                  </div>

                  <Button variant="danger" type="submit" className="col-md-2" onClick={this.handleRegisterSubmit} style={buttonStyle}>Register</Button>{' '}
                </form>
              </div> 
            </div>
        );
      } 
    }
}