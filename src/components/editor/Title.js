import React from "react";
import { setNoteTitleAction } from "../../actions";
import store from "../../store";
import "./styles/Title.css";

const Title = (props) => {
  return (
    <textarea maxLength={50} value={props.text} onChange={onChange} onKeyDown={onKeyDown} />
  );
}

const onChange = (event) => {
  let newValue = event.target.value;
  store.dispatch(setNoteTitleAction(newValue));
}

const onKeyDown = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
}

export default Title;
