import './styles/NewNoteBtn.css';
import React, { Component } from 'react';
import store from '../../store';
import { Button } from 'react-bootstrap';
import { addNewNoteAction } from '../../actions';
import { connect } from 'react-redux';
import { withFirebase } from '../firebase';

class NewNoteBtn extends Component {
  render(){
    return <Button className="new-note-btn" onClick={this.onClick} />;
  };

  onClick = () => {
    store.dispatch(addNewNoteAction());

    let user = this.props.firebase.auth.currentUser;
    if (!user)
      return;

    console.log('AHHHH');
    this.props.firebase.saveTitlesToDB(user, this.props.titlesList);
    this.props.firebase.saveUserNotesToDB(user, this.props.notesList);
    console.log('AHHHH2');
  };
}

const mapStateToProps = state => {
  return { notesList: state.notesList, titlesList: state.titlesList };
};

export default connect(mapStateToProps)(withFirebase(NewNoteBtn));
