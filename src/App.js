import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import backgroundImage from './images/image1.png';
import Navbar from './components/navbar.component.js';
import Home from './components/home.component.js';
import About from './components/about.js';
import Login from './components/login.component.js';
import Users from './components/user/coach/coach.users.component.js';
import User from './components/user/user.component.js';
import CoachRegister from './components/user/coach/coach.register.component.js';
import ManageUsers from './components/user/coach/manage.users.component';
import EditUser from './components/user/coach/coach.edit.user.component.js';
import Calendar from './components/calendar/calendar.component.js';

function App() {

  const user = JSON.parse(sessionStorage.getItem('user'));
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') ? true : false;

  const userdetails = {
    user: user,
    isLoggedIn: isLoggedIn,
  };
  return (
    <Router>
      <SocialMediaBar/>
      
      <div className="container-fluid" style={{ backgroundImage: `url(${backgroundImage})`, height:"1000px", backgroundRepeat: "no-repeat",backgroundPosition: "center", backgroundSize: "cover"}}>
        <div className="container">
          <Navbar userdetails={userdetails}/>
          <Route path="/home" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/login" exact component={() => <Login userdetails={userdetails}/>}/> 
          <Route path="/users" exact component={() => <Users userdetails={userdetails}/>}/> 
          <Route path="/register" exact component={() => <CoachRegister userdetails={userdetails}/>}/>
          <Route path="/manage-users" exact component={() => <ManageUsers userdetails={userdetails}/>}/>
          <Route path="/edit-user" exact component={() => <EditUser userdetails={userdetails}/>}/>
          <Route path="/user" exact component={() => <User userdetails={userdetails}/>}/>
          <Route path="/calendar" exact component={() => <Calendar userdetails={userdetails}/>}/>
          <br/><br/>
        </div>
      </div>
    </Router>
  );
}

function SocialMediaBar() {
  return (
    <div className="icon-bar">
        <a href="https://www.facebook.com/profile.php?id=100000371807183" className="facebook"><i className="fa fa-facebook"></i></a>
        <a href="mailto:amitzano16@gmail.com" target="_blank" className="google"><i className="fa fa-google"></i></a>
        <a href="https://www.instagram.com/amit_zanofit/" className="instagram"><i className="fa fa-instagram"></i></a>
        <a href="https://wa.me/+972505424422?text=בוא נקבע אימון!" className="whatsapp"><i className="fa fa-whatsapp"></i></a>
        <a href="https://goo.gl/maps/Z6pohCmaqzrVThxU7" className="location"><i className="fa fa-map-marker"></i></a>
      </div>
  );
}

export default App;
