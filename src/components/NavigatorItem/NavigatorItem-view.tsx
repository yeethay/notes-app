import React, { Component } from 'react';
import classNames from 'classnames';
import { setNoteActiveAction } from '../../actions';
import './NavigatorItem.css';
import { INotesList } from '../../interfaces';
import { ActionTypes } from '../../actions/types';
import { FirebaseFunctions } from '../../utils/firebase/firebase';

interface IProps {
  user: firebase.User;
  notesList: INotesList;
  active: boolean;
  dispatch: (arg0: ActionTypes) => void;
  id: string;
  title: string;
  preview: string;
  firebase: FirebaseFunctions;
}

class NavigatorItem extends Component<IProps> {
  componentDidUpdate() {
    let { user, notesList, firebase } = this.props;
    if (user && firebase) {
      firebase.updateNotesListActiveFlags({ user, notesList });
    }
  }

  onClick(noteId: string) {
    if (this.props.dispatch) {
      this.props.dispatch(setNoteActiveAction(noteId));
    }
  }

  render() {
    let classes = classNames('navigator-item', {
      active: this.props.active,
    });

    const nbsp = '\u00A0';
    return (
      <div
        className={classes}
        onClick={() => {
          this.props.id && this.onClick(this.props.id);
        }}
      >
        <h4>{this.props.title || nbsp}</h4>
        <p>{this.props.preview || nbsp}</p>
      </div>
    );
  }
}

export default NavigatorItem;
