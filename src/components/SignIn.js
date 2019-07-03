import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import firebase from "firebase/app";
import { auth } from "../firebase";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      photoUrl: ""
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  authButtonClickCallback = () => {
    if (!this.state.loggedIn) {
      var provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then(result => {
        this.setState({
          loggedIn: true
        });
      });
    } else {
      auth
        .signOut()
        .then(() => {
          this.setState({
            loggedIn: false
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  render() {
    return (
      <div>
        <Button onClick={this.authButtonClickCallback}>
          {this.state.loggedIn ? "Log out" : "Log in"}
        </Button>
      </div>
    );
  }
}

export default SignIn;
