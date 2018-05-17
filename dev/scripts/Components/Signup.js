import React, {Component} from 'react';
// Importing info for the React router
import {Link} from 'react-router-dom';
// NewOption is for the new radio buttons
import NewOption from './NewOption';
// Navigation is the navigation bar
import Navigation from './Navigation';
// routes is the list of links for the router
import * as routes from '../Constants/routes';
// Importing firebase
import firebase from './firebase';
// Creating checkboxes for skills list
import Checkbox from './NewList';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      createEmail: '',
      createPassword: '',
      firstName: '',
      username: '',
      lastName: '',
      city: '',
      queer: '',
      queerOptions: [],
      selectedQueerOption: '',
      ethnicity: '',
      ethnicityOptions: [],
      selectedEthnicityOption: '',
      gender: '',
      genderOptions: [],
      selectedGenderOption: '',
      skills: '',
      skillsList: [],
      selectedSkills: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.createUser = this.createUser.bind(this);
    this.handleSubmitSkill = this.handleSubmitSkill.bind(this);
    this.handleSubmitQueer = this.handleSubmitQueer.bind(this);
    this.handleQueerOptionChange = this.handleQueerOptionChange.bind(this);
    this.handleSubmitEthnicity = this.handleSubmitEthnicity.bind(this);
    this.handleEthnicityOptionChange = this.handleEthnicityOptionChange.bind(this);                     
    this.handleSubmitGender = this.handleSubmitGender.bind(this); 
    this.handleGenderOptionChange = this.handleGenderOptionChange.bind(this);  
    this.handleCheckbox = this.handleCheckbox.bind(this);        
    this.handleFormSubmit = this.handleFormSubmit.bind(this); 
    // this.checkSelected = this.checkSelected.bind(this);    
  }
  // Creates a new user profile
  createUser(e) {
    e.preventDefault();
    const email = this.state.createEmail;
    const password = this.state.createPassword;
    console.log(email, password);
    this.setState({
      createEmail: '',
      createPassword: ''
    })
  }
  // Pushes new option for Queer to firebase database
  handleSubmitQueer(e) {
    e.preventDefault();
    const newQueerOption = {
      value: this.state.queer,
    }
    const dbRefQueer = firebase.database().ref('options/queer');
    dbRefQueer.push(newQueerOption);
    this.setState({
      queer: '',
    })
  }
  // Pushes new option for Ethnicity to firebase database
  handleSubmitEthnicity(e) {
    e.preventDefault();
    const newEthnicityOption = {
      value: this.state.ethnicity,
    }
    const dbRefEthnicity = firebase.database().ref('options/ethnicity');
    dbRefEthnicity.push(newEthnicityOption);
    this.setState({
      ethnicity: '',
    })
  }
  // Pushes new option for Gender to firebase database
  handleSubmitGender(e) {
    e.preventDefault();
    const newGenderOption = {
      value: this.state.gender,
    }
    const dbRefGender = firebase.database().ref('options/gender');
    dbRefGender.push(newGenderOption);
    this.setState({
      gender: '',
    })
  }
  // Pushes new option for skill to firebase database
  handleSubmitSkill(e) {
    e.preventDefault();
    const newSkill = {
      value: this.state.skills,
      isChecked: false,
    }
    const dbRefSkills = firebase.database().ref('skills');
    dbRefSkills.push(newSkill);
    this.setState({
      skills: '',
    })
  }
  // Pushes all items to a new user account
  handleFormSubmit() {
    e.preventDefault();
    const newUser = {
      email: this.state.createEmail,
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      city: this.state.city,
      gender: this.state.selectedGenderOption,
      ethnicity: this.state.selectedEthnicityOption,
      queer: this.state.selectedQueerOption,
    }
    const dbRefSkills = firebase.database().ref('users');
    dbRefSkills.push(newSkill);
    this.setState({
      skills: '',
    })
  }
  // Starts my componentDidMount()
  componentDidMount() {
    // Checks to see if the user has already logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
    // Pulls queer options from firebase and displays them on the page
    const dbRefQueer = firebase.database().ref('options/queer');
    dbRefQueer.on('value', (snapshot) =>{
      const queerData = snapshot.val();
      const queerIdentities = [];
      for (let identity in queerData) {
        queerData[identity].key = identity;
        queerIdentities.push(queerData[identity]);
      }
      this.setState({
        queerOptions: queerIdentities,
        selectedQueerOption: '',
      })
    })
    // Pulls ethnicity options from firebase and displays them on the page
    const dbRefEthnicity = firebase.database().ref('options/ethnicity');
    dbRefEthnicity.on('value', (snapshot) => {
      const ethnicityData = snapshot.val();
      const ethnicityIdentities = [];
      for (let identity in ethnicityData) {
        ethnicityData[identity].key = identity;
        ethnicityIdentities.push(ethnicityData[identity]);
      }
      this.setState({
        ethnicityOptions: ethnicityIdentities,
        selectedEthnicityOption: ''
      })
    })
    // Pulls gender options from firebase and displays them on the page
    const dbRefGender = firebase.database().ref('options/gender');
    dbRefGender.on('value', (snapshot) => {
      const genderData = snapshot.val()
      const genderIdentities = [];
      for (let identity in genderData) {
        genderData[identity].key = identity;
        genderIdentities.push(genderData[identity]);
      }
      this.setState({
        genderOptions: genderIdentities,
        selectedGenderOption: '',
      })
    })
    // Pulls skills from firebase database and displays them on the page
    const dbRefSkills = firebase.database().ref('skills');
    dbRefSkills.on('value', (snapshot) => {
      const skillsData = snapshot.val();
      const skillsIdentities = [];
      for (let identity in skillsData) {
        skillsData[identity].key = identity;
        skillsIdentities.push(skillsData[identity]);
      }
      this.setState({
        skillsList: skillsIdentities,
      })
      const checkedSkills = [];
      skillsIdentities.filter((skill) => {
        if (skill.isChecked === true) {
          checkedSkills.push(skill)
          return checkedSkills
        }
      })
      this.setState({
        selectedSkills: checkedSkills,
      })
    })
  }
  // Function that tracks everytime there's a change in the text input
  handleChange(e, field) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // Function that tracks when someone selects a different option from queer selection
  handleQueerOptionChange(e) {
    this.setState({
      selectedQueerOption: e.target.value,
    })
  }
  // Function that tracks when someone selects a different option from the Ethnicity selection
  handleEthnicityOptionChange(e) {
    this.setState({
      selectedEthnicityOption: e.target.value,
    })
  }
  // Function that tracks when someone selects a different option from the Gender selection
  handleGenderOptionChange(e) {
    this.setState({
      selectedGenderOption: e.target.value,
    })
  }
  handleCheckbox(keyToUpdate, isChecked) {
    firebase.database().ref(`skills/${keyToUpdate}`)
      .update({
        isChecked: !isChecked,
      })
  }
  // Renders to the page
  render() {
      return (
          <div className="create-user">
            {/* Start of form to create new user */}
            <form onSubmit={this.handleFormSubmit}>
              <div>
              <input type="text" name="createEmail" onChange={(e) => this.handleChange(e, "createEmail")} placeholder="Please enter your e-mail address" value={this.state.createEmail} />
              <input type="password" name="createPassword" onChange={(e) => this.handleChange(e, "createPassword")} placeholder="Please enter your desired password" value={this.state.createPassword} />
              <input type="text" name="username" value={this.state.username}/>
              <button onClick={(e) => this.createUser(e)}>Submit</button>
              </div>
              {/* Main text inputs */}
              <input type="text" name="firstName" onChange={this.handleChange} value={this.state.firstName} />
              <input type="text" name="lastName" onChange={this.handleChange} value={this.state.lastName} />
              <input type="text" name="city" onChange={this.handleChange} value={this.state.city} />
              {/* Renders queer options to the page */}
              {this.state.queerOptions.map((queerOption, i) => {
                return( <NewOption
                  key={queerOption.key}
                  firebaseKey ={queerOption.key} 
                  identity={queerOption.value} 
                  checked={this.state.selectedQueerOption === queerOption.value}
                  value={queerOption.value}
                  handleOptionChange={this.handleQueerOptionChange}
                  />)
                })
              }
            {/* Submit button for queer options */}
            <div>
              <input type="text" name='queer' onChange={this.handleChange} value={this.state.queer} />
              <button onClick={this.handleSubmitQueer} type="submit">Not Yet Listed</button>
            </div>
            {/* Renders Ethnicity options to the page */}
            {this.state.ethnicityOptions.map((ethnicityOption, i) => {
              return (<NewOption
                key={ethnicityOption.key}
                firebaseKey={ethnicityOption.key}
                identity={ethnicityOption.value}
                checked={this.state.selectedEthnicityOption === ethnicityOption.value}
                value={ethnicityOption.value}
                handleOptionChange={this.handleEthnicityOptionChange}                
                />)
              })
            }
            {/* Submit button for ethnicity options */}
            <div>
              <input type="text" name="ethnicity" onChange={this.handleChange} value={this.state.ethnicity} />
              <button type="submit" onClick={ this.handleSubmitEthnicity }> Not Yet Listed </button>
            </div>
            {/* Renders Gender options onto the page */}
          {this.state.genderOptions.map((genderOption, i) => {
            return (<NewOption
              key={genderOption.key}
              firebaseKey={genderOption.key}
              identity={genderOption.value}
              checked={this.state.selectedGenderOption === genderOption.value}
              value={genderOption.value}
              handleOptionChange={this.handleGenderOptionChange}
              />)
            })
          }
          {/* Submit button for new Gender option */}
          <div>
            <input type="text" name="gender" onChange={this.handleChange} value={this.state.gender} />
            <button onClick={this.handleSubmitGender}> Not Yet Listed </button>
            </div>
            {/* Renders skills list onto page */}
            {this.state.skillsList.map((skill) => {
              return (<Checkbox
                isChecked={skill.isChecked}
                key={skill.key}
                firebaseKey={skill.key}
                label={skill.value}
                handleCheckbox={this.handleCheckbox}
              />)
            })
            }
            {/* Submit button for new skills option */}
            <div>
              <input type="text" name='skills' onChange={this.handleChange} value={this.state.skills} />
              <button onClick={this.handleSubmitSkill} type="submit">Not Yet Listed</button>
            </div>
          {/* <input type="submit" /> */}
          </form>
          </div>
      )
    }
  
  }
export default Signup;