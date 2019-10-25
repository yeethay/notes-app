import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { withFirebase } from '../firebase';
import { removeAllNotesAction } from '../../actions';

class SignOut extends Component {
  onClick = () => {
    this.props.firebase.signOut();
    this.props.dispatch(removeAllNotesAction());
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
  firebase: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect()(withFirebase(SignOut));
