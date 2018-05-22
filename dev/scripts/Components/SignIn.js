// Standard imports
import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
// Imports for navigation
import * as routes from '../Constants/routes';
import AccountPage from './AccountPage';

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      loginEmail: '',
      loginPassword: '',
      loggedIn: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  // Standard handle change event
  handleChange(e, field) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // Sign Out option
  signOut() {
    firebase.auth().signOut().then(function (success) {
      console.log('Signed Out!')
    }, function (error) {
      console.log(error);
    });
  }
  // Sign In option
  signIn(e) {
    e.preventDefault();
    const email = this.state.loginEmail;
    const password = this.state.loginPassword;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((success) => {
      console.log(`Logged in as ${success.email}`);
    }), (error) => {
      console.log(error);
    }
    this.setState({
      loginEmail: '',
      loginPassword: ''
    })
  }
  
  componentDidMount() {
    // Makes sure that the proper buttons show up for user
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true})
      } else {
        this.setState({loggedIn: false})
      }
    })
  }
  render() {
    return (
      <div className="app-page app-page--signin">
      <div className="app-page--center">
        {this.state.loggedIn ?
          <div className='sign-out'>
              <Link className="btn btn__txt btn__txt--smaller btn--square btn--wide" to={routes.ACCOUNT_PAGE}>Your Account</Link>   
              <button className="btn btn__txt btn__txt--smaller btn--square btn--wide" onClick={this.signOut}>Sign Out</button>
          </div>
          : <div>
            <h2 className="header2 header2--dark"> Welcome Back!</h2>
            <p className="paragraph">Please sign in below</p>
            <form className="sign-in" onSubmit={(e) => this.signIn(e)}>
            <input className="input__txt main" type="text" placeholder="Please enter your e-mail address" onChange={(event) => this.handleChange(event, "loginEmail")} name="loginEmail" value={this.state.loginEmail}/>
            <input className="input__txt" type="password" placeholder="Please enter your password" onChange={(event) => this.handleChange(event, "loginPassword")}  name="loginPassword" value={this.state.loginPassword}/>
            <input className="btn btn__txt btn__txt--smaller btn--square btn--wide" type="submit" value="Login" />
            <p className="paragraph">Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link></p>
          </form>
        </div> }
        </div>     
    </div>
    )
  }
}

export default SignIn; 