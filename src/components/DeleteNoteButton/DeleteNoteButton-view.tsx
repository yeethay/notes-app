import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { deleteNoteAction } from '../../actions';
import { ActionTypes } from '../../actions/types';

interface IProps {
  dispatch: (arg0: ActionTypes) => void;
  id: string;
  ref: string;
}

class DeleteNoteButton extends Component<IProps> {
  render() {
    return <Button className="delete-note-button" onClick={this.onClick} />;
  }

  onClick = () => {
    this.props.dispatch(deleteNoteAction(this.props.id));
  };
}

export default DeleteNoteButton;
