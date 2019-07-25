import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar, { Brand } from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import store from "../../store";
import * as types from "../../actions/types";
import { updateAuthStateAction } from "../../actions";
import { withFirebase } from "../firebase";

class NavBar extends Component {
  componentDidMount() {
    if (!this.props.firebase) {
      return null;
    }

    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        store.dispatch(
          updateAuthStateAction({
            type: types.UPDATE_AUTH_STATE,
            loggedIn: true
          })
        );
      } else {
        store.dispatch(
          updateAuthStateAction({
            type: types.UPDATE_AUTH_STATE,
            loggedIn: false
          })
        );
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

const mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

export default connect(mapStateToProps)(withFirebase(NavBar));
