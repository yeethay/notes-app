import React from 'react';
import PropTypes from 'prop-types';
import { setNoteTitleAction } from '../../actions';
import { connect } from 'react-redux';
import './NoteTitle.css';

const NoteTitle = props => {
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

const onChange = (props, event) => {
  let title = event.target.value;

  let activeNoteId = Object.keys(props.notesList).find(
    key => props.notesList[key].active === true
  );

  props.dispatch(setNoteTitleAction({ activeNoteId, title }));
};

const onKeyDown = event => {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
};

NoteTitle.propTypes = {
  text: PropTypes.node,
  notesList: PropTypes.object,
};

export default NoteTitle;
