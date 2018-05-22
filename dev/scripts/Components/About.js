import React, { Component } from 'react';
// Importing info for the React router
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import { Link } from 'react-router-dom';
// Importing firebase
import firebase from './firebase';
// Navigation is the navigation bar
import Navigation from './Navigation';
// routes is the list of links for the router
import * as routes from '../Constants/routes';

const About = () => {
    return (
    <div className="app-page">
      <div className="app-page--center app-page--padded">
        <h2 className="header2 header2--dark">About Reccomendem</h2>
        <p className="paragraph paragraph--left">Reccomendem is intended as a tool for theatre artists at all levels to find collaborators. I come from a theatre background and am still incredibly passionate about building tools to improve diversity in the field by providing opportunities for artists from underrepresented communities.</p>
        <p className="paragraph paragraph--left">What you're seeing is the alpha version of the app. It was built in a week using React.js as my fifth project for HackerYou's nine-week front end web development bootcamp. Some of the main features that are currently missing are a search function, the function to contact a particular artist, and the function to reccomend an artist for a position. Some other features I'd like to add in the future are:</p>
        <ul>
          <li className="paragraph paragraph--left">A messaging component for artists to connect</li>
          <li className="paragraph paragraph--left">Options for artists to update their profiles (without having to contact me)</li>
          <li className="paragraph paragraph--left">Options for artists to remove their profiles (without having to contact me)</li>
          <li className="paragraph paragraph--left">Options for authentication with a Google account</li>
        </ul>
        <p className="paragraph paragraph--left">If you have any thoughts on how I could improve, I'd love to hear them. You can reach me at ky.capstick@gmail.com.</p>
        <p className="paragraph">&copy; Ky Capstick 2018</p>
      </div>
    </div>
    )
}

export default About;