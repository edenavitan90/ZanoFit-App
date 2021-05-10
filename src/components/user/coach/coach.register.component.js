import React, {Component} from 'react';
import axios from 'axios';

export default class CoachRegister extends Component {
    constructor(props) {
      super(props);
  
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangeFirstName = this.onChangeFirstName.bind(this);
      this.onChangeLastName = this.onChangeLastName.bind(this);
      this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
      //this.onChangeRegistrationDate = this.onChangeRegistrationDate.bind(this);
      this.onChangeRole = this.onChangeRole.bind(this);
      this.onChangeTrainingPricePerHour = this.onChangeTrainingPricePerHour.bind(this);
      this.onChangeGender = this.onChangeGender.bind(this);
      this.onChangeNotes = this.onChangeNotes.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  
      this.state = {
        email: '',
        firstName:'',
        lastName:'',
        phoneNumber:'',
        password:'',
        dateOfBirth:'',
        registrationDate:'',
        role:'',
        trainingPricePerHour:'',
        gender:'',
        notes:'' 
      }
    }
    // --------------------------------------------------------------------
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
      })
    }
    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        })
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        })
    }
    onChangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    onChangeDateOfBirth(e) {
        this.setState({
            dateOfBirth: e.target.value
        })
    }
    // onChangeRegistrationDate(e) {
    //     this.setState({
    //         registrationDate: e.target.value
    //     })
    // }
    onChangeRole(e) {
        this.setState({
            role: e.target.value
        })
    }
    onChangeTrainingPricePerHour(e) {
        this.setState({
            trainingPricePerHour: e.target.value
        })
    }
    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        })
    }
    onChangeNotes(e) {
        this.setState({
            notes: e.target.value
        })
    }
    // --------------------------------------------------------------------

    onSubmit(e) {
      e.preventDefault();
  
      const user = {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        password: this.state.password,
        dateOfBirth: this.state.dateOfBirth,
        //registrationDate: this.state.registrationDate,
        role: this.state.role,
        trainingPricePerHour: this.state.trainingPricePerHour,
        gender: this.state.gender,
        notes: this.state.notes,
      }
  
      console.log(user);
  
      axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data));
  
      this.setState({
        username: ''
      })
    }
  
    render() {
      return (
        <div>
          <h3>Create New User</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Username: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeEmail}
                  />
            </div>
            <div className="form-group">
              <input type="submit" value="Create User" className="btn btn-primary" />
            </div>
          </form>
        </div>
      )
    }
  }