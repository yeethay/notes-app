import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import firebase from 'firebase/app';
<<<<<<< HEAD:src/components/SignIn/SignIn-view.js
=======
import { withFirebase } from '../firebase';
>>>>>>> master:src/components/navbar/SignIn.js

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

<<<<<<< HEAD:src/components/SignIn/SignIn-view.js
export default SignIn;
=======
export default withFirebase(SignIn);
>>>>>>> master:src/components/navbar/SignIn.js
