import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import Landing from './Components/Landing'
import Navigation from './Components/Navigation';
import SignIn from './Components/SignIn';
import SignUp from './Components/Signup';
import Account from './Components/AccountPage';
import NewProfile from './Components/NewProfile'
import * as routes from './Constants/routes';
import AccountPage from './Components/AccountPage'

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
