import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { addNewNoteAction } from '../../actions';
import { withFirebase } from '../firebase';
import './styles/NewNoteBtn.css';

const NewNoteBtn = props => {
  useEffect(() => {
    let { user, notesList, firebase } = props;
    if (user) {
      firebase.saveUserNotesToDB(user, notesList);
    }
  }, []);

  return <Button className="new-note-btn" onClick={() => onClick(props)} />;
};

const onClick = props => {
  props.dispatch(addNewNoteAction());
};

const mapStateToProps = ({ user, notesList }) => ({ user, notesList });

export default connect(mapStateToProps)(withFirebase(NewNoteBtn));
