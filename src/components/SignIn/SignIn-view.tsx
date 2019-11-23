import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { firebaseSignInAction } from '../../actions';
import { ActionTypes } from '../../actions/types';

interface IProps {
  dispatch: (arg0: ActionTypes) => void;
}
class SignIn extends Component<IProps> {
  onClick = () => {
    this.props.dispatch(firebaseSignInAction());
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
