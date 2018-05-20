import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/routes';
import AccountPage from './AccountPage';
import firebase from 'firebase';

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
  handleChange(e, field) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  signOut() {
    firebase.auth().signOut().then(function (success) {
      console.log('Signed Out!')
    }, function (error) {
      console.log(error);
    });
  }
  signIn(e) {
    e.preventDefault();
    const email = this.state.loginEmail;
    const password = this.state.loginPassword;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((success) => {
      console.log(`Logged in as ${success.email}`);
      console.log(firebase.auth().currentUser)
    }), (error) => {
      console.log(error);
    }
    this.setState({
      loginEmail: '',
      loginPassword: ''
    })
  }

  render() {
    return (
      <div className="app-page app-page--signin">
      <div className="app-page--center">
        {this.state.loggedIn ?
          <div className='sign-out'>
              <Link className="btn btn__txt btn__txt--smaller btn--square" to={routes.ACCOUNT_PAGE}>Your Account</Link>   
              <button className="btn btn__txt btn__txt--smaller btn--square" onClick={this.signOut}>Sign Out</button>
          </div>
          : <div>
            <h2 className="header2 header2--dark"> Welcome Back!</h2>
            <p className="paragraph">Please sign in below</p>
            <form className="sign-in" onSubmit={(e) => this.signIn(e)}>
            <input className="input__txt" type="text" placeholder="Please enter your e-mail address" onChange={(event) => this.handleChange(event, "loginEmail")} name="loginEmail" value={this.state.loginEmail}/>
            <input className="input__txt" type="password" placeholder="Please enter your password" onChange={(event) => this.handleChange(event, "loginPassword")}  name="loginPassword" value={this.state.loginPassword}/>
            <input className="btn btn__txt btn__txt--smaller btn--square" type="submit" value="Login" />
            <p className="paragraph">Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link></p>
          </form>
        </div> }
        </div>     
    </div>
    )
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true})
      } else {
        this.setState({loggedIn: false})
      }
    })
  }
}

export default SignIn; 