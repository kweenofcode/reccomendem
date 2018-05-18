import React, {Component} from 'react';
// Importing info for the React router
import {Link} from 'react-router-dom';
// Navigation is the navigation bar
import Navigation from './Navigation';
// routes is the list of links for the router
import * as routes from '../Constants/routes';
// Importing firebase
import firebase from './firebase';
// Creating checkboxes for skills list

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      createEmail: '',
      createPassword: '',
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
          <div className="create-user">
            {/* Start of form to create new user */}
            <h2>Create An Account</h2>
            <form onSubmit={this.handleFormSubmit}>
              <input type="text" name="createEmail" onChange={(e) => this.handleChange(e, "createEmail")} placeholder="Please enter your e-mail address" value={this.state.createEmail} />
              <input type="password" name="createPassword" onChange={(e) => this.handleChange(e, "createPassword")} placeholder="Please enter your desired password" value={this.state.createPassword} />
              <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder='Please enter your desired username'/>
              {/* <button onClick={(e) => this.createUser(e)}>Submit</button> */}
              {/* Main text inputs */}
              </form> 
          </div>
      )
    }
  }
export default Signup;