import React from 'react';
import { Button } from 'react-bootstrap';
import { addNewNoteAction } from '../../actions';
import './NewNoteButton.css';
import { ActionTypes } from '../../actions/types';

interface IProps {
  dispatch: (arg0: ActionTypes) => void;
}

const NewNoteButton = (props: IProps) => {
  return <Button className="new-note-btn" onClick={() => onClick(props)} />;
};

const onClick = (props: IProps) => {
  props.dispatch(addNewNoteAction());
};

export default NewNoteButton;
