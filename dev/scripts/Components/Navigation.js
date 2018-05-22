import React from 'react';
import {Link} from 'react-router-dom';
import * as routes from '../Constants/routes';

class Navigation extends React.Component {
  constructor() {
    super();
    this.state= {
      hideNav: 'list hidden-list hide-nav',
      hideMenu: 'main-nav list',
    }
    this.toggleHidden = this.toggleHidden.bind(this);
    this.reToggleHidden = this.reToggleHidden.bind(this);
  }

  toggleHidden() {
    this.setState({
      hideNav: ('list hidden-list hide-nav' ? 'list hidden-list' : 'list hidden-list hide-nav'),
      hideMenu: ( 'main-nav list' ? 'main-nav list hide-nav' : 'main-nav list'),
    })
    console.log('clicked')
  }
  reToggleHidden() {
    this.setState({
      hideNav: 'list hidden-list hide-nav',
      hideMenu: 'main-nav list', 
    })
    console.log('clicked')
  }

  render(){
    return(
    <div>
      <ul onClick={this.toggleHidden} className={this.state.hideMenu}>
          <li className="main-nav__item btn__txt btn btn--thin btn__txt--small btn--ripple"><i className="fa fa-bars"></i></li>
      </ul>
        <ul className={this.state.hideNav}>
          <li className="main-nav__item btn--thin btn__txt btn btn__txt--small btn--ripple" onClick={this.reToggleHidden}>X</li>
          <li><Link className="main-nav__item btn__txt btn--thin btn btn__txt--small btn--ripple" to={routes.LANDING}><i className="fa fa-home"></i></Link></li>
          <li><Link className="main-nav__item btn__txt btn--thin btn btn__txt--small btn--ripple" to={routes.ABOUT}><i className="fa fa-info"></i></Link></li>
      </ul>
    </div>
    )}
  }
  
  export default Navigation;