import React from 'react';
import { Button } from 'react-bootstrap';
import store from '../../store';
import { addNewNoteAction } from '../../actions';
import './styles/NewNoteBtn.css';

const NewNoteBtn = () => {
  return <Button className="new-note-btn" onClick={onClick} />;
};

const onClick = () => {
  store.dispatch(addNewNoteAction());
};

export default NewNoteBtn;
