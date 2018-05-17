import React from 'react';
import {Link} from 'react-router-dom';
import * as routes from '../Constants/routes';

const Navigation = () => {
    return(
    <div>
      <ul>
        <li><Link to={routes.LANDING}> Home </Link></li>
        <li><Link to={routes.SIGN_UP}> Signup </Link></li>
        <li><Link to={routes.SIGN_IN}> Sign-In </Link></li>
        <li><Link to={routes.ACCOUNT}> Account </Link></li>
        </ul>
    </div>
    )}
  
  export default Navigation;