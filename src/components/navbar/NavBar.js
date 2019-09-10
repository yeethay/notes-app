<<<<<<< HEAD
import Nav from "react-bootstrap/Nav";
import Navbar, { Brand } from "react-bootstrap/Navbar";
import React, { Component } from "react";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { connect } from "react-redux";
import { withFirebase } from "../firebase";
=======
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar, { Brand } from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SignIn from './SignIn';
import SignOut from './SignOut';
import store from '../../store';
import { updateAuthStateAction } from '../../actions';
import { withFirebase } from '../firebase';
>>>>>>> master

class NavBar extends Component {
  componentDidMount() {
    if (!this.props.firebase) {
      return null;
    }

    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
<<<<<<< HEAD
        this.props.firebase.setLoggedInState(true);
        this.props.firebase.addUser(user);
        this.props.firebase.getUserNotes(user);
      } else {
        this.props.firebase.setLoggedInState(false);
=======
        store.dispatch(
          updateAuthStateAction({
            loggedIn: true,
          })
        );
      } else {
        store.dispatch(
          updateAuthStateAction({
            loggedIn: false,
          })
        );
>>>>>>> master
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
};

const mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

export default connect(mapStateToProps)(withFirebase(NavBar));
