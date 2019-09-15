import React from 'react';
import { setNoteTitleAction } from '../../actions';
import { withFirebase } from '../firebase';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles/Title.css';

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

const onChange = (props, event) => {
  let newValue = event.target.value;
  props.dispatch(setNoteTitleAction(newValue));

  let user = props.firebase.auth.currentUser;
  if (!user)
    return;

  props.firebase.saveTitlesToDB(user, props.titlesList);
};

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

export default connect(mapStateToProps)(withFirebase(Title));
