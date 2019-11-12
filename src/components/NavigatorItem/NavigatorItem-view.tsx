import React, { Component } from 'react';
import classNames from 'classnames';
import { setNoteActiveAction } from '../../actions';
import './NavigatorItem.css';
import { INotesList } from '../../interfaces';
import { ActionTypes } from '../../actions/types';
import { FirebaseFunctions } from '../../utils/firebase/firebase';
import DeleteNoteButton from '../DeleteNoteButton';

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

  onClick(e: MouseEvent, noteId: string) {
    console.log(e.target);
    if (this.props.dispatch && (e!.target! as any).type !== 'button') {
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
        onClick={e => {
          this.props.id && this.onClick(e as any, this.props.id);
        }}
      >
        <h4>{this.props.title || nbsp}</h4>
        <p>{this.props.preview || nbsp}</p>
        <DeleteNoteButton ref="delete" id={this.props.id} />
      </div>
    );
  }
}

export default NavigatorItem;
