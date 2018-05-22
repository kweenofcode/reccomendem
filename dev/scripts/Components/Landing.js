import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/routes';

class Landing extends React.Component {
  render() {  
    return (
    <div className="app-page">
      <h1 className="header1 main-header">Recommend'em</h1>
      <ul className="list main-list">
        <li className="btn btn--main btn--ripple"><Link className="btn__txt" to={routes.SIGN_IN}> Sign In</Link></li>
        <li className="btn btn--main btn--ripple"><Link className="btn__txt" to={routes.SIGN_UP}> Sign Up</Link></li>
      </ul>
    </div>
    )
}
}

export default Landing;