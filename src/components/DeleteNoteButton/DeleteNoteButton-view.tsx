import React, { Component } from 'react';
import { deleteNoteAction } from '../../actions';
import { ActionTypes } from '../../actions/types';
import Icon from 'react-icons-kit';
import { ic_delete } from '../../utils/icons';
import { FirebaseFunctions } from '../../utils/firebase/firebase';

interface IProps {
  dispatch: (arg0: ActionTypes) => void;
  firebase: FirebaseFunctions;
  id: string;
  lastModified: number;
  active: boolean;
  user: firebase.User;
}

class DeleteNoteButton extends Component<IProps> {
  render() {
    return (
      <div className="delete-note-button" onClick={e => this.onClick(e)}>
        <Icon icon={ic_delete} />
      </div>
    );
  }

  onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    this.props.dispatch(
      deleteNoteAction(
        this.props.id,
        this.props.lastModified,
        this.props.active
      )
    );
    this.props.firebase.deleteNote(this.props.user, this.props.id);
  };
}

export default DeleteNoteButton;
