import React from "react";
import { setNoteTitleAction } from "../../actions";
import { connect } from 'react-redux';
import "./styles/Title.css";

const Title = (props) => {
  return (
    <textarea
      maxLength={50}
      value={props.titlesList[props.currentNoteIndex].title}
      onChange={(event) => onChange(props, event)}
      onKeyDown={onKeyDown}
      placeholder="Untitled note"
    />
  );
}

const onChange = (props, event) => {
  let newValue = event.target.value;
  props.dispatch(setNoteTitleAction(newValue));
}

const onKeyDown = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
}

const mapStateToProps = ({ titlesList, currentNoteIndex }) => ({
  titlesList,
  currentNoteIndex
});

export default connect(mapStateToProps)(Title);
