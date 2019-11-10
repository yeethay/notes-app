import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import firebase from 'firebase/app';

class SignIn extends Component {
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

SignIn.propTypes = {
  firebase: PropTypes.object,
};

export default SignIn;