// standard imports
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
// Items for navigation
import Navigation from './Components/Navigation';
import * as routes from './Constants/routes';
import AccountPage from './Components/AccountPage'
import Landing from './Components/Landing'
import NewProfile from './Components/NewProfile'
import SignIn from './Components/SignIn';
import SignUp from './Components/Signup';

class App extends React.Component {
    render() {
      return (
        <Router> 
          <div>
          <Navigation />
          <Route 
            exact path={routes.LANDING}
            component={() => <Landing />}
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
            exact path={routes.NEW_PROFILE}
            component={() => <NewProfile />}
          />
          <Route 
            exact path={routes.ACCOUNT_PAGE}
            component={() => <AccountPage />}
          />
          </div>
        </Router>
      )
    }
  }

ReactDOM.render(<App />, document.getElementById('app'));
