import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { removeAllNotesAction, firebaseSignOutAction } from '../../actions';
import { ActionTypes } from '../../actions/types';

interface IProps {
  dispatch: (arg0: ActionTypes) => void;
}
class SignOut extends Component<IProps> {
  onClick = () => {
    this.props.dispatch(firebaseSignOutAction());
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
