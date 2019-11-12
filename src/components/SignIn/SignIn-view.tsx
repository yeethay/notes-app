import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import firebase from 'firebase/app';
import { FirebaseFunctions } from '../../utils/firebase/firebase';

interface IProps {
  firebase: FirebaseFunctions;
}
class SignIn extends Component<IProps> {
  onClick = () => {
    this.props.firebase.signInPopup(new firebase.auth.GoogleAuthProvider());
  };

  render() {
    return (
      <div>
        <Button onClick={this.onClick}>Sign In</Button>
      </div>
    );
  }
}

export default SignIn;
