const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyCrMqLJPhFrZYTPF8V4cBVCOwkA7E4AxB8",
  authDomain: "final-project---touchpoint.firebaseapp.com",
  projectId: "final-project---touchpoint",
  storageBucket: "final-project---touchpoint.appspot.com",
  messagingSenderId: "709329410311",
  appId: "1:709329410311:web:d3b6474ff33cba2c92cda2"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase