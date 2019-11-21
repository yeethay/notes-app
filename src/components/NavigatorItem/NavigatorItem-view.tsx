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
  componentDidUpdate(): void {
    let { user, notesList, firebase } = this.props;
    if (user && firebase) {
      firebase.updateNotesListActiveFlags({ user, notesList });
    }
  }

  onClick(): void {
    this.props.dispatch(setNoteActiveAction(this.props.id));
  }

  render(): JSX.Element {
    let classes = classNames('navigator-item', {
      active: this.props.active,
    });

    const nbsp = '\u00A0';
    return (
      <div className={classes} onClick={() => this.onClick()}>
        <div className="toprow">
          <h4> {this.props.title || nbsp} </h4>
          <DeleteNoteButton
            id={this.props.id}
            lastModified={this.props.notesList[this.props.id].lastModified}
            active={this.props.notesList[this.props.id].active}
          />
        </div>
        <p>{this.props.preview || nbsp}</p>
      </div>
    );
  }
}

export default NavigatorItem;
