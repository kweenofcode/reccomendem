import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Landing from './Components/LandingPage';
import Home from './Components/HomePage';
import SignIn from './Components/SignIn';
import SignUp from './Components/Signup';
import Account from './Components/AccountPage';
import NewProfile from './Components/NewProfile'
import * as routes from './Constants/routes';

class App extends React.Component {
    render() {
      return (
        <Router> 
          <div>
          <Navigation />
          <Route 
            exact path={routes.LANDING}
            component = {() => <Landing />}
          />
          <Route
            exact path={routes.SIGN_UP}
            component={() => <SignUp />}
          />
          <Route
            exact path={routes.SIGN_IN}
            component={() => <SignIn />}
          />
          <Route
            exact path={routes.HOME}
            component={() => <HOME />}
          />
          <Route 
            exact path={routes.NEW_PROFILE}
            component={() => <NewProfile />}
          />
          </div>
        </Router>
      )
    }
  }

ReactDOM.render(<App />, document.getElementById('app'));
