import React from 'react';
import {Link} from 'react-router-dom';
import * as routes from '../Constants/routes';

const Navigation = () => {
    return(
    <div>
      <ul className="main-nav">
        <li><Link className="main-nav__item" to={routes.LANDING}> Home </Link></li>
          <li><Link className="main-nav__item" to={routes.SIGN_UP}> Signup </Link></li>
          <li><Link className="main-nav__item" to={routes.SIGN_IN}> Sign-In </Link></li>
          <li><Link className="main-nav__item" to={routes.NEW_PROFILE}> New Profile </Link></li>
          <li><Link className="main-nav__item" to={routes.ACCOUNT_PAGE}> Account </Link></li>
        </ul>
    </div>
    )}
  
  export default Navigation;