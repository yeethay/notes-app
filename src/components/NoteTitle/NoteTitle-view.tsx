import React from 'react';
import { setNoteTitleAction } from '../../actions';
import './NoteTitle.css';
import { INotesList } from '../../interfaces';
import { ActionTypes } from '../../actions/types';

interface IProps {
  text: string;
  notesList: INotesList;
  dispatch: (arg0: ActionTypes) => void;
}

const NoteTitle = (props: IProps): JSX.Element => {
  return (
    <textarea
      maxLength={50}
      value={props.text}
      onChange={evt => onChange(props, evt)}
      onKeyDown={onKeyDown}
      placeholder="Untitled note"
    />
  );
};

const onChange = (props: IProps, event: React.ChangeEvent<HTMLTextAreaElement>) => {
  let title = event.target.value;

  let activeNoteId = Object.keys(props.notesList).find(key => props.notesList[key].active === true);
  if (!activeNoteId) {
    console.error('Could not get active note id');
    return;
  }

  document.title = title ? 'Notes App | ' + title : 'Notes App';
  props.dispatch(setNoteTitleAction(activeNoteId, title));
};

const onKeyDown = (event: React.KeyboardEvent): void => {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
};

export default NoteTitle;
