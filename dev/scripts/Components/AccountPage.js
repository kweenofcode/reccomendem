import React from 'react';
import firebase from './firebase';
import Navigation from './Navigation';
import * as routes from '../Constants/routes'
import NewListItem from './NewListItems'


class AccountPage extends React.Component {
  constructor() {
    super();
    this.state = {
      allUsers: [],
    }
  }
  componentDidMount() {
    const dbRef = firebase.database().ref('users');
    dbRef.on('value', (snapshot) => {
      const user = snapshot.val()
      const allUsers = []
      for (let feature in user) {
        user[feature].key = feature;
        allUsers.push(user[feature])
      }
      this.setState({
        allUsers: allUsers
      })
    })
  }
  render() {
  return(
    <div className="app-page">
      <h1 className="header1 profile__header">Profiles</h1>
      {this.state.allUsers.map((user) => {
        return (
        <div>
          <div className="profile">
          <div className="profile__img">
            <img src={user.avatarURL} alt=""/>
          </div>
          <div className="profile__about">
            <h2 className="header2 profile__name">{user.firstName} <br /><span className="profile__name--last">{user.lastName}</span></h2>
            <button className="btn btn--main profile__about__contact btn__txt">Contact</button>
            <h3 className="header3">About</h3>
            <ul className="list profile__list">
              {user.city ? <li className="paragraph profile__list__item"><span className="profile__list__item__header">City: </span> {user.city} {user.province}</li> : <li className="paragraph profile__list__item"><span className="profile__list__item__header">City: </span></li>}
              {user.gender ? <li className="paragraph profile__list__item"><span className="profile__list__item__header"> Gender: </span> {user.gender}</li> : <li className="paragraph profile__list__item"><span className="profile__list__item__header"> Gender: </span></li>}
              {user.sexuality ? <li className="paragraph profile__list__item"><span className="profile__list__item__header"> Sexuality: </span> {user.sexuality}</li> : <li className="paragraph profile__list__item"><span className="profile__list__item__header"> Sexuality: </span></li>}
              {user.culturalBackground ? <li className="paragraph profile__list__item"><span className="profile__list__item__header"> Cultural Background: </span> {user.culturalBackground}</li> : <li className="paragraph profile__list__item"><span className="profile__list__item__header"> Cultural Background: </span> </li>}
            </ul>
            <div className="profile__skills">
              <div className="profile__skills__list">
                <h3 className="header3">Skills</h3>
                <ul className="list profile__skills">
                {user.skills ? user.skills.map((skill) => {
                  return(
                    <NewListItem
                      name="Skills"
                      value={skill.value}
                    />
                  )
                  }) : <li className="paragraph profile__skills__item"></li>}
                </ul>
              </div>
            </div>
          </div>
          <div className="profile__social">
            <h3 className="header3 profile__social__header">Social Links</h3>
            <ul className="list profile__social__list">
                <li className="profile__social__item">
                  <a className="profile__social__link" href={user.websiteURL} target="_blank"><i className="fa fa-link"></i><p className="paragraph">{user.website}</p></a>
                </li>
                <li className="profile__social__item">
                  <a className="profile__social__link" href={user.twitterURL} target="_blank"><i className="fab fa-twitter"></i><p className="paragraph">{user.twitter}</p></a>
                </li>
                <li className="profile__social__item">
                  <a className="profile__social__link" href={user.instagramURL} target="_blank"><i className="fab fa-instagram"></i><p className="paragraph">{user.instagram}</p></a>
                </li>
                <li className="profile__social__item">
                  <a className="profile__social__link" href={user.facebookURL} target="_blank"><i className="fab fa-facebook"></i><p className="paragraph">{user.facebook}</p></a>
                </li>
            </ul>
          </div>
        </div>
      </div>
            )
          })}
      </div>
  )
}
}


export default AccountPage;