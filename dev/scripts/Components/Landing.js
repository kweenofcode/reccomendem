import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/routes';

class Landing extends React.Component {
  render() {  
    return (
    <div className="app-page">
      <div className="main-header wrapper">
        <h1 className="header1 main-header__title">Recommend'em</h1>
        <h2 className="header2 header2--large">Find the Best Collaborator&#8482;</h2>
        <p className="paragraph">Created with a desire to improve diversity and representation within the theatre community, Recommend'em is a theatre collaborator database aimed at providing space for queer artists and/or artists of color to self-identify and connect. Any artists that live at an intersection of queer and person of color are encouraged to create an account.</p>
        <ul className="list main-list">
          <li className="btn btn--main btn--ripple"><Link className="btn__txt" to={routes.SIGN_IN}> Sign In</Link></li>
          <li className="btn btn--main btn--ripple"><Link className="btn__txt" to={routes.SIGN_UP}> Sign Up</Link></li>
        </ul>
      </div>
    </div>
    )
}
}

export default Landing;