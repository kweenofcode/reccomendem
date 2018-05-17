import React from 'react';
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
      <div>
        {this.state.loggedIn ?
          <div className='sign-out'>
            <button onClick={this.signOut}>Sign Out</button>
          </div>
          : <div className="sign-in">
        <form onSubmit={(e) => this.signIn(e)}>
          <input type="text" placeholder="Please enter your e-mail address" onChange={(event) => this.handleChange(event, "loginEmail")} name="loginEmail" value={this.state.loginEmail}/>
          <input type="password" placeholder="Please enter your desired password" onChange={(event) => this.handleChange(event, "loginPassword")}  name="loginPassword" value={this.state.loginPassword}/>
          <input type="submit" value="Login" />
        </form>
        </div> }
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