// Importing standards 
import React from 'react';
import firebase from './firebase';
// Importing everything I need for navigation
import { Link } from 'react-router-dom';
import * as routes from '../Constants/routes';
import Navigation from './Navigation';
// Importing Component that provides list items for identities
import NewOption from './NewOption';
// Iporting Component that provides options for new 
import Checkbox from './NewList';

class NewProfile extends React.Component{
  constructor() {
    super();
    this.state={
      // States for options on the page
      culturalBackground: '',
      culturalBackgroundOptions: [],
      selectedCulturalBackgroundOption: '',
      gender: '',
      genderOptions: [],
      selectedGenderOption: '',
      sexuality: '',
      sexualityOptions: [],
      selectedSexualityOption: '',
      skills: '',
      skillsList: [],
      selectedSkills: [],
      // States to toggle hidden items
      hidden: 'hidden',
      uploading: false,
      error: '',
      submitted: false,
      // States to gather user information
      city: '',
      facebook: '',
      file: '',
      firstName: '',
      instagram: '',
      lastName: '',
      province: '',
      twitter: '',
      website: '',
    }
    // Handles all changes
    this.handleChange = this.handleChange.bind(this);
    // Displaying option to add new identities
    this.toggleHidden = this.toggleHidden.bind(this);
    // 01 - Cultural Background Options
    this.handleSubmitCulturalBackground = this.handleSubmitCulturalBackground.bind(this);
    this.handleCulturalBackgroundOptionChange = this.handleCulturalBackgroundOptionChange.bind(this);
    // 02 - Gender Options
    this.handleSubmitGender = this.handleSubmitGender.bind(this);
    this.handleGenderOptionChange = this.handleGenderOptionChange.bind(this);
    // 03 - Sexuality Options
    this.handleSubmitSexuality = this.handleSubmitSexuality.bind(this);
    this.handleSexualityOptionChange = this.handleSexualityOptionChange.bind(this);
    // 04 - Skills
    this.handleSubmitSkill = this.handleSubmitSkill.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    // 05 - Uploading Files
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    // 06 Form Submission
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  // Start of Component Did Mount
  componentDidMount() {
    // Pulls culturalBackground options from firebase and displays them on the page
    const dbRefCulturalBackground = firebase.database().ref('options/culturalBackground');
    dbRefCulturalBackground.on('value', (snapshot) => {
      const culturalBackgroundData = snapshot.val();
      const culturalBackgroundIdentities = [];
      for (let identity in culturalBackgroundData) {
        culturalBackgroundData[identity].key = identity;
        culturalBackgroundIdentities.push(culturalBackgroundData[identity]);
      }
      this.setState({
        culturalBackgroundOptions: culturalBackgroundIdentities,
        selectedCulturalBackgroundOption: ''
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
    // Pulls sexuality options from firebase and displays them on the page
    const dbRefSexuality = firebase.database().ref('options/sexuality');
    dbRefSexuality.on('value', (snapshot) => {
      const sexualityData = snapshot.val();
      const sexualityIdentities = [];
      for (let identity in sexualityData) {
        sexualityData[identity].key = identity;
        sexualityIdentities.push(sexualityData[identity]);
      }
      this.setState({
        sexualityOptions: sexualityIdentities,
        selectedSexualityOption: '',
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
      // Pulls and updates checked skills from firebase
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
  // Pushes new option for CulturalBackground to firebase database
  handleSubmitCulturalBackground(e) {
    e.preventDefault();
    const newCulturalBackgroundOption = {
      value: this.state.culturalBackground,
    }
    const dbRefCulturalBackground = firebase.database().ref('options/culturalBackground');
    dbRefCulturalBackground.push(newCulturalBackgroundOption);
    this.setState({
      culturalBackground: '',
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
  // Pushes new option for Sexuality to firebase database
  handleSubmitSexuality(e) {
    e.preventDefault();
    const newSexualityOption = {
      value: this.state.sexuality,
    }
    const dbRefSexuality = firebase.database().ref('options/sexuality');
    dbRefSexuality.push(newSexualityOption);
    this.setState({
      sexuality: '',
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
  // Handles Form Submission
  handleFormSubmit(e) {
    e.preventDefault();
    const newUser = {
      avatarURL: this.state.avatarURL,
      city: this.state.city,
      culturalBackground: this.state.selectedCulturalBackgroundOption,
      firstName: this.state.firstName,
      facebook: this.state.facebook,
      gender: this.state.selectedGenderOption,
      instagram: this.state.instagram,
      lastName: this.state.lastName,
      province: this.state.province,
      sexuality: this.state.selectedSexualityOption,
      skills: this.state.selectedSkills,
      twitter: this.state.twitter,
      website: this.state.website,
    }
    const dbRefSkills = firebase.database().ref('users');
    dbRefSkills.push(newUser);
    this.setState({
      city: '',
      culturalBackground: '',
      email: '',
      facebook: '',
      firstName: '',
      gender: '',
      instagram: '',
      lastName: '',
      province: '',
      sexuality: '',
      skills: [],
      twitter: '',
      username: '',
      website: '',
      submitted: true,
    })
  }
  // Function that tracks everytime there's a change in the text input
  handleChange(e, field) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // Function that tracks when someone selects a different option from the culturalBackground selection
  handleCulturalBackgroundOptionChange(e) {
    this.setState({
      selectedCulturalBackgroundOption: e.target.value,
    })
  }
  // Function that tracks when someone selects a different option from the Gender selection
  handleGenderOptionChange(e) {
    this.setState({
      selectedGenderOption: e.target.value,
    })
  }
  // Function that tracks when someone selects a different option from sexuality selection
  handleSexualityOptionChange(e) {
    this.setState({
      selectedSexualityOption: e.target.value,
    })
  }
  // Function to handle the checking and un-checking of checkboxes
  handleCheckbox(keyToUpdate, isChecked) {
    firebase.database().ref(`skills/${keyToUpdate}`)
    .update({
      isChecked: (isChecked === true ? false : true),
    })
  }
  // Function to handle when user adds a file
  handleFileSelect(e) {
    this.setState({
      value: e.target.value
    })
  }
  // Function for when user uploads image
  handleFileUpload(e) {
    this.setState({
      uploading: true,
    })
    const file = this.file.files[0];
    const imgUrl = this.state.value;
    const storageRef = firebase.storage().ref();
    const mainImage = storageRef.child(this.file.files[0].name);
    mainImage.put(file).then((snapshot) => {
      mainImage.getDownloadURL().then((url) => {
        this.setState({
          avatarURL: url,
          uploading: false,
        })
      })
    })
  }
  // Function to toggle whether or not inputs are hidden
  toggleHidden(e) {
    e.preventDefault()
    this.setState({
      hidden: this.state.hidden === 'hidden' ? "additional-option" : "hidden",
    })
  }
  // Start of render
  render() {
    return(
      <div className="app-page profile-page">
        <div className="app-page--wide">
        {/* Start of form */}
          <form action="#" onSubmit={this.handleFormSubmit}>
          {/* Personal Information */}
            <div className="profile-item">
              <h2 className="header2 header2--dark">Personal Information</h2>
              <div className="profile-item__name">
                <label className="screen-reader" htmlFor={this.state.firstName}>First Name</label>
                <input className="input__txt input--profile" type="text" name="firstName" onChange={this.handleChange} value={this.state.firstName} id={this.state.firstName} placeholder='Please enter your first name' />
                <label className="screen-reader" htmlFor={this.state.lastName}>Last Name</label>
                <input className="input__txt input--profile" type="text" name="lastName" onChange={this.handleChange} value={this.state.lastName} id={this.state.firstName} placeholder='Please enter your last name' />
                <label className="screen-reader" htmlFor={this.state.city}>City</label>
                <input className="input__txt input--profile" type="text" name="city" onChange={this.handleChange} value={this.state.city} placeholder='Please enter your city' />
                <label className="screen-reader" htmlFor={this.state.province}>Province</label>
                <input className="input__txt input--profile" type="text" name="province" onChange={this.handleChange} value={this.state.province} placeholder='Please enter your province' />
              </div>
            </div>
            {/* Web Presence */}
            <div className="profile-item">
              <h2 className="header2 header2--dark">Web Presence</h2>
              <div className="profile-item__name">
                <label className="screen-reader" htmlFor={this.state.website}>Website</label>
                <input className="input__txt input--profile" type="text" name="website" onChange={this.handleChange} value={this.state.website} id={this.state.website} placeholder='Please enter your website' />
                <label className="screen-reader" htmlFor={this.state.twitter}>Twitter Handle</label>
                <input className="input__txt input--profile" type="text" name="twitter" onChange={this.handleChange} value={this.state.twitter} id={this.state.twitter} placeholder='Please enter your twitter handle' />
                <label className="screen-reader" htmlFor={this.state.instagram}>Instagram Handle</label>
                <input className="input__txt input--profile" type="text" name="instagram" onChange={this.handleChange} value={this.state.instagram} id={this.state.instagram} placeholder='Please enter your instagram handle' />
                <label className="screen-reader" htmlFor={this.state.facebook}>Facebook Profile</label>
                <input className="input__txt input--profile" type="text" name="facebook" onChange={this.handleChange} value={this.state.facebook} id={this.state.facebook} placeholder='Please enter your facebook profile' />
              </div>
            </div>
            {/* Start of identity options */}
            <div className='profile-item'>
              <h2 className="header2 header2--dark">Don't See Your Preferred Term?</h2>
              <button className='btn btn--square btn--small btn__txt btn__txt--smaller btn--yellow' onClick={this.toggleHidden}>Add your identity</button>
            </div>
            {/* Renders sexuality options to the page */ }
            <div className="profile-item">
              <h2 className="header2 header2--dark">Sexuality</h2>
              <div className="options">
                {this.state.sexualityOptions.map((sexualityOption, i) => {
                  return (<NewOption
                    key={sexualityOption.key}
                    firebaseKey={sexualityOption.key}
                    identity={sexualityOption.value}
                    checked={this.state.selectedSexualityOption === sexualityOption.value}
                    value={sexualityOption.value}
                    handleOptionChange={this.handleSexualityOptionChange}
                  />)
                })}
                {/* Submit button for sexuality options */}
              </div>
              <div className={this.state.hidden}>
                <input className="input--profile input--profile--small input__txt" type="text" name='sexuality' onChange={this.handleChange} value={this.state.sexuality} />
                <button className="btn__txt--smaller btn__txt btn btn--square btn--small btn--yellow" onClick={this.handleSubmitSexuality}>Add My Identity</button>
              </div>
            </div>
            {/* Renders culturalBackground options to the page */ }
            <div className="profile-item">
              <h2 className="header2 header2--dark">Your Cultural Background</h2>
              <div className="options">
                {this.state.culturalBackgroundOptions.map((culturalBackgroundOption) => {
                  return (<NewOption
                    key={culturalBackgroundOption.key}
                    firebaseKey={culturalBackgroundOption.key}
                    identity={culturalBackgroundOption.value}
                    checked={this.state.selectedCulturalBackgroundOption === culturalBackgroundOption.value}
                    value={culturalBackgroundOption.value}
                    handleOptionChange={this.handleCulturalBackgroundOptionChange}
                    className='list-item'
                  />)
                })}
              </div>
              {/* Submit button for culturalBackground options */}
              <div className={this.state.hidden}>
                <input className="input--profile input--profile--small input__txt" type="text" name="culturalBackground" onChange={this.handleChange} value={this.state.culturalBackground} />
                <button className="btn__txt--smaller btn__txt btn btn--square btn--small btn--yellow" onClick={this.handleSubmitCulturalBackground}> Add My Identity </button>
              </div>
            </div>
            {/* Renders Gender options onto the page */ }
            <div className="profile-item">
              <h2 className="header2 header2--dark">Gender Identity</h2>
              <div className="options">
                {this.state.genderOptions.map((genderOption, i) => {
                  return (<NewOption
                    key={genderOption.key}
                    firebaseKey={genderOption.key}
                    identity={genderOption.value}
                    checked={this.state.selectedGenderOption === genderOption.value}
                    value={genderOption.value}
                    handleOptionChange={this.handleGenderOptionChange}
                    className="list-item"
                  />)
                })}
              </div>
              {/* Submit button for new Gender option */}
              <div className={this.state.hidden}>
                <input className="input--profile input--profile--small input__txt" type="text" name="gender" onChange={this.handleChange} value={this.state.gender} />
                <button className="btn btn__txt btn__txt--smaller btn--square btn--small btn--yellow"onClick={this.handleSubmitGender}> Add My Identity </button>
              </div>
            </div>
            {/* Renders skills list onto page */ }
            <div className="profile-item">
              <h2 className="header2 header2--dark">Your Skills</h2>
              <div className="options">
                {this.state.skillsList.map((skill) => {
                  return (<Checkbox
                  isChecked={skill.isChecked}
                  key={skill.key}
                  firebaseKey={skill.key}
                  label={skill.value}
                  handleCheckbox={this.handleCheckbox}
                  className="list-item"
                  />)
                })}
              </div>
              {/* Submit button for new skills option */}
              <div className={this.state.hidden}>
                <input className="input--profile input--profile--small input__txt" type="text" name='skills' onChange={this.handleChange} value={this.state.skills} />
                <button className="btn__txt--smaller btn__txt btn btn--square btn--small btn--yellow" onClick={this.handleSubmitSkill}>Add My Skill</button>
              </div>
            </div> 
            {this.state.uploading ? <div className="loading"></div> : <div>
              <div className="profile-item profile-item--horizontal">
                <h2 className="header2 header2--dark"> Upload Your Headshot</h2>
                <div>
                  <img src={this.state.avatarURL} alt="" />
                  <input type="file" ref={(ref) => { this.file = ref }} onChange={this.handleFileSelect} />
                  <button className="btn__txt--smaller btn__txt btn btn--square btn--yellow" onClick={this.handleFileUpload}>Upload</button>
                </div>
              </div>
            </div>}
            {/* Make profile button that creates user and takes you to profile page */}
            {this.state.avatarURL ? <div className="profile-item">
              <input className="btn btn--square btn--wide btn__txt btn__txt--smaller btn--yellow" type="submit" value="Make Profile" />
            </div> : ''}
            {this.state.submitted ? <Link className='btn btn--square btn__txt btn__txt--smaller accounts-page' to={routes.ACCOUNT_PAGE}> Account Page </Link> : ""}
          </form>
      </div>
      </div>)
  }
}

export default NewProfile; 