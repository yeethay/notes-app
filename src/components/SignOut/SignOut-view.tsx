import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { removeAllNotesAction } from '../../actions';
import { ActionTypes } from '../../actions/types';
import { FirebaseFunctions } from '../../utils/firebase/firebase';

interface IProps {
  firebase: FirebaseFunctions;
  dispatch: (arg0: ActionTypes) => void;
}
class SignOut extends Component<IProps> {
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

export default SignOut;
