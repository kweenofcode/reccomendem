import React from 'react';
import firebase from './firebase';
import Navigation from './Navigation';
import * as routes from '../Constants/routes'


class AccountPage extends React.Component {
  constructor() {
    super();
    this.state = {
      allUsers: []
    }
  }
  componentDidMount() {
    const dbRef = firebase.database().ref('users');
    dbRef.on('value', (snapshot) => {
      const user = snapshot.val()
      console.log(user)
      const allUsers = []
      for (let feature in user) {
        allUsers.push(user[feature])
      }
      this.setState({
        allUsers: allUsers
      })
    })
  }
  render() {
  return(
    <div>
      <ul>
        {this.state.allUsers.map((user) => {
          return (
          <ul>
            <li>{user.firstName} {user.lastName}</li>
              <li><img src={user.avatarURL} alt=""/></li>
            <li>{user.city}</li>
            <li>{user.gender}</li>
            <li>{user.sexuality}</li>
            <li>{user.culturalBackground}</li>
          </ul>
          )
        })}
      </ul>
    </div>
  )
}
}


export default AccountPage;