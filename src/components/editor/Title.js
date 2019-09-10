<<<<<<< HEAD
import React from "react";
import { setNoteTitleAction } from "../../actions";
import { connect } from 'react-redux';
import "./styles/Title.css";
=======
import React from 'react';
import PropTypes from 'prop-types';
import { setNoteTitleAction } from '../../actions';
import store from '../../store';
import './styles/Title.css';
>>>>>>> master

const Title = props => {
  return (
    <textarea
      maxLength={50}
      value={props.titlesList[props.currentNoteIndex].title}
      onChange={(event) => onChange(props, event)}
      onKeyDown={onKeyDown}
      placeholder="Untitled note"
    />
  );
};

<<<<<<< HEAD
const onChange = (props, event) => {
  let newValue = event.target.value;
  props.dispatch(setNoteTitleAction(newValue));
}
=======
const onChange = event => {
  let newValue = event.target.value;
  store.dispatch(setNoteTitleAction(newValue));
};
>>>>>>> master

const onKeyDown = event => {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
};

Title.propTypes = {
  text: PropTypes.node,
};

const mapStateToProps = ({ titlesList, currentNoteIndex }) => ({
  titlesList,
  currentNoteIndex
});

export default connect(mapStateToProps)(Title);
