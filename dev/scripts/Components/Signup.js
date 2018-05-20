import React, {Component} from 'react';
// Importing info for the React router
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import {Link} from 'react-router-dom';
// Navigation is the navigation bar
import Navigation from './Navigation';
// routes is the list of links for the router
import * as routes from '../Constants/routes';
// Importing firebase
import firebase from './firebase';
// Creating checkboxes for skills list
import NewProfile from './NewProfile';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      createEmail: '',
      createPassword: '',
      username: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.createUser = this.createUser.bind(this);
    // this.checkSelected = this.checkSelected.bind(this);    
  }
  // Creates a new user profile
  createUser(e) {
    e.preventDefault();
    const email = this.state.createEmail;
    const password = this.state.createPassword;
    console.log(email, password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      const user = {
        uid: result.user.uid,
        email: email,
      }
      this.setState({
        user
      })
      const dbRef = firebase.database().ref(`${this.state.username}`).push(user)
    })
      .catch((error) => console.log(error.code, error.message));
    firebase.auth().set
    this.setState({
      createEmail: '',
      createPassword: ''
    })
  }
  // Starts my componentDidMount()
  componentDidMount() {
    // Checks to see if the user has already logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  // Function that tracks everytime there's a change in the text input
  handleChange(e, field) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  // Renders to the page
  render() {
      return (
        <div className="app-page app-page--signup">
          <div className="app-page--center">
            {/* Start of form to create new user */}
            {this.state.loggedIn ?
              <div className='sign-out'>
                <Link className="btn btn__txt btn__txt--smaller btn--square" to={routes.NEW_PROFILE}>Create Your Profile</Link>
              </div>
              : <div>
                  <h2 className="header2 header2--dark">Create An Account</h2>
                  <form className="sign-up" onSubmit={this.handleFormSubmit}>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder='Please enter your desired username' />
                    <input className="input__txt" type="text" name="createEmail" onChange={(e) => this.handleChange(e, "createEmail")} placeholder="Please enter your e-mail address" value={this.state.createEmail} />
                    <input className="input__txt" type="password" name="createPassword" onChange={(e) => this.handleChange(e, "createPassword")} placeholder="Please enter your desired password" value={this.state.createPassword} />
                    <button className="btn btn__txt btn__txt--smaller btn--square" onClick={(e) => this.createUser(e)}>Submit</button>
                <p className="paragraph">Already have an account? <Link to={routes.SIGN_IN}>Sign In</Link></p>
                </form>
              </div>}
          </div>
        </div>
      )
    }
  }
export default Signup;