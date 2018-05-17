import firebase from 'firebase';

// initialize firebase
const config = {
  apiKey: "AIzaSyDBfLOOWw1rlxcwyQy2u_YuAyluWZLsMB8",
  authDomain: "recommendem-af575.firebaseapp.com",
  databaseURL: "https://recommendem-af575.firebaseio.com",
  projectId: "recommendem-af575",
  storageBucket: "recommendem-af575.appspot.com",
  messagingSenderId: "1023168646944"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;