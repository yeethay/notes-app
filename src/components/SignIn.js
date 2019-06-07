import React, { Component } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

class SignIn extends Component {
  constructor(props) {
    super(props);
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyDqk-tCkJUNKqN1rwhHDvOUrMQ80KDdnYI",
      authDomain: "fouronesixnine-notes-app.firebaseapp.com",
      databaseURL: "https://fouronesixnine-notes-app.firebaseio.com",
      projectId: "fouronesixnine-notes-app",
      storageBucket: "",
      messagingSenderId: "967381980154",
      appId: "1:967381980154:web:5a5a8276ddab77a1"
    };

    this.state = {
      loggedIn: 'Log In',
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <button onClick={this.signInCallback}>
        {this.state.loggedIn}
      </button>
    );
  }

  signInCallback = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var token = result.credential.accessToken;
        var user = result.user;
        this.setState({loggedIn: 'Log Out'})
      });
  }
}

export default SignIn;
