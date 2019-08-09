import React from "react";
import { Button } from "react-bootstrap";
import { addNewNoteAction } from "../../actions";
import "./NewNoteButton.css";

const NewNoteButton = props => {
  return <Button className="new-note-btn" onClick={() => onClick(props)} />;
};

const onClick = props => {
  props.dispatch(addNewNoteAction());
};

export default NewNoteButton;
