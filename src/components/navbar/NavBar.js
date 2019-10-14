import Nav from 'react-bootstrap/Nav';
import Navbar, { Brand } from 'react-bootstrap/Navbar';
import React, { Component } from 'react';
import SignIn from './SignIn';
import SignOut from './SignOut';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFirebase } from '../firebase';

class NavBar extends Component {
  componentDidMount() {
    if (!this.props.firebase) {
      return null;
    }

    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.props.firebase.setLoggedInState(true);
        // TODO: Add checks to do based on what the user already has
        this.props.firebase.addUser(user);
        this.props.firebase.getUserNotesFromDB(user);
        console.log('ORAAAAAAAAA');
        this.props.firebase.saveTitlesToDB(user, this.props.titlesList);
        this.props.firebase.saveUserNotesToDB(user, this.props.notesList);
      } else {
        this.props.firebase.setLoggedInState(false);
      }
    });
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Brand href="#home">Notes For Now</Brand>
        <Nav className="mr-auto" />
        {this.props.loggedIn !== undefined &&
          (this.props.loggedIn === true ? <SignOut /> : <SignIn />)}
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  loggedIn: PropTypes.bool,
  firebase: PropTypes.node,
  titlesList: PropTypes.array,
  notesList: PropTypes.array
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    titlesList: state.titlesList,
    notesList: state.notesList
  };
};

export default connect(mapStateToProps)(withFirebase(NavBar));
