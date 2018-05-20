import React from 'react';
import NewOption from './NewOption';
import Checkbox from './NewList';
import firebase from './firebase';
import Navigation from './Navigation';
import * as routes from '../Constants/routes';
import FileUploader from 'react-firebase-file-uploader'
import { Link } from 'react-router-dom';

class NewProfile extends React.Component{
  constructor() {
    super();
    this.state={
      firstName: '',
      lastName: '',
      username: '',
      isUploading: false,
      progress: 0,
      file: '',
      error: '',
      city: '',
      sexuality: '',
      sexualityOptions: [],
      selectedSexualityOption: '',
      culturalBackground: '',
      culturalBackgroundOptions: [],
      selectedCulturalBackgroundOption: '',
      gender: '',
      genderOptions: [],
      selectedGenderOption: '',
      skills: '',
      skillsList: [],
      selectedSkills: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitSkill = this.handleSubmitSkill.bind(this);
    this.handleSubmitSexuality = this.handleSubmitSexuality.bind(this);
    this.handleSexualityOptionChange = this.handleSexualityOptionChange.bind(this);
    this.handleSubmitCulturalBackground = this.handleSubmitCulturalBackground.bind(this);
    this.handleCulturalBackgroundOptionChange = this.handleCulturalBackgroundOptionChange.bind(this);
    this.handleSubmitGender = this.handleSubmitGender.bind(this);
    this.handleGenderOptionChange = this.handleGenderOptionChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    // Trying to add a file upload  
    this.handleFileSelect = this.handleFileSelect.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }
  componentDidMount() {
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

  handleFormSubmit(e) {
    e.preventDefault();
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      city: this.state.city,
      gender: this.state.selectedGenderOption,
      culturalBackground: this.state.selectedCulturalBackgroundOption,
      sexuality: this.state.selectedSexualityOption,
      skills: this.state.selectedSkills,
      avatarURL: this.state.avatarURL,
    }
    const dbRefSkills = firebase.database().ref('users');
    dbRefSkills.push(newUser);
    this.setState({
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      city: '',
      gender: '',
      culturalBackground: '',
      sexuality: '',
      skills: [],
    })
  }
  // Function that tracks everytime there's a change in the text input
  handleChange(e, field) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // Function that tracks when someone selects a different option from sexuality selection
  handleSexualityOptionChange(e) {
    this.setState({
      selectedSexualityOption: e.target.value,
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
  handleCheckbox(keyToUpdate, isChecked) {
    firebase.database().ref(`skills/${keyToUpdate}`)
      .update({
        isChecked: (isChecked === true ? false : true),
      })
  }
  handleFileSelect(e) {
    this.setState({
      value: e.target.value
    })
  }
  handleFileUpload() {
    const file = this.file.files[0];
    console.log(file);
    const imgUrl = this.state.value;
    const storageRef = firebase.storage().ref();
    const mainImage = storageRef.child(this.file.files[0].name);
    mainImage.put(file).then((snapshot) => {
      console.log(snapshot);
      mainImage.getDownloadURL().then((url) => {
        console.log(url);
        this.setState({
          avatarURL: url,
        })
      })
    })
  }

  render() {
    return(
    <div>
        <form action="#" onSubmit={this.handleFileUpload}>
        <input type="file" ref={(ref) => { this.file = ref }} onChange={this.handleFileSelect}/>
        <input type="submit" value="Upload" />
      </form>
      <form action="#" onSubmit={this.handleFormSubmit}>
        <h2 className="header2">Your Personal Information</h2>
        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder='Please enter your desired username' />
        <input type="text" name="firstName" onChange={this.handleChange} value={this.state.firstName} placeholder='Please enter your first name' />
        <input type="text" name="lastName" onChange={this.handleChange} value={this.state.lastName} placeholder='Please enter your last name' />
        <input type="text" name="city" onChange={this.handleChange} value={this.state.city} placeholder='Please enter your city' />
        {/* Renders sexuality options to the page */ }
        <h2 className="header2">Your Sexuality</h2>
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
          <div className="hidden">
            <input type="text" name='sexuality' onChange={this.handleChange} value={this.state.sexuality} />
            <button onClick={this.handleSubmitSexuality}>Not Yet Listed</button>
          </div>
        </div>
            {/* Renders culturalBackground options to the page */ }
        <h2 className="header2">Your Cultural Background</h2>
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
          {/* Submit button for culturalBackground options */}
          <div>
            <input type="text" name="culturalBackground" onChange={this.handleChange} value={this.state.culturalBackground} />
            <button onClick={this.handleSubmitCulturalBackground}> Not Yet Listed </button>
          </div>
        </div>
        {/* Renders Gender options onto the page */ }
        <h2 className="header2">Your Gender Identity</h2>
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
          {/* Submit button for new Gender option */}
          <div className="hidden">
            <input type="text" name="gender" onChange={this.handleChange} value={this.state.gender} />
            <button onClick={this.handleSubmitGender}> Not Yet Listed </button>
          </div>
        </div>
        {/* Renders skills list onto page */ }
        <h2 className="header2">Your Skills</h2>
        <div className="options">
          {this.state.skillsList.map((skill) => {
            return (<Checkbox
              isChecked={skill.isChecked}
              key={skill.key}
              firebaseKey={skill.key}
              label={skill.value}
              handleCheckbox={this.handleCheckbox}
              className="list-xitem"
            />)
          })}
          {/* Submit button for new skills option */}
          <div className="hidden">
            <input type="text" name='skills' onChange={this.handleChange} value={this.state.skills} />
            <button onClick={this.handleSubmitSkill}>Not Yet Listed</button>
          </div>
        </div> 
        <input type="submit" />
      </form>
      <Link className="main-nav__item list-item" to={routes.ACCOUNT_PAGE}> Account Page </Link>
    </div>)
  }
}

export default NewProfile; 