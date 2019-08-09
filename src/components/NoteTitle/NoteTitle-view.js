import React from "react";
import { setNoteTitleAction } from "../../actions";
import "./NoteTitle.css";

const NoteTitle = props => {
  return (
    <textarea
      maxLength={50}
      value={props.text}
      onChange={e => onChange(e, props)}
      onKeyDown={onKeyDown}
      placeholder="Untitled note"
    />
  );
};

const onChange = (event, props) => {
  let newValue = event.target.value;
  props.dispatch(setNoteTitleAction(newValue));
};

const onKeyDown = event => {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
};

export default NoteTitle;
