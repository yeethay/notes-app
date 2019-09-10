import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { withFirebase } from '../firebase';

class SignOut extends Component {
  onClick = () => {
    this.props.firebase.signOut();
  };

  render() {
    return (
      <div>
        <Button onClick={this.onClick}>Sign Out</Button>
      </div>
    );
  }
}

SignOut.propTypes = {
  firebase: PropTypes.node,
};

export default withFirebase(SignOut);
