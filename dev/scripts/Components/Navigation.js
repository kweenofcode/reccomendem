import React from 'react';
import {Link} from 'react-router-dom';
import * as routes from '../Constants/routes';

const Navigation = () => {
    return(
    <div>
      <ul className="main-nav list">
          <li><Link className="main-nav__item btn__txt btn__txt--small btn--ripple" to={routes.LANDING}><i className="fa fa-home"></i></Link></li>
        </ul>
    </div>
    )}
  
  export default Navigation;