import React, { Component } from "react";
import Navbar, { Brand } from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SignIn from "../SignIn";
import SignOut from "../SignOut";
import { updateAuthStateAction } from "../../actions";

class NavBar extends Component {
  componentWillMount() {
    if (!this.props.firebase) {
      return null;
    }

    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.props.dispatch(
          updateAuthStateAction({
            loggedIn: true
          })
        );
      } else {
        this.props.dispatch(
          updateAuthStateAction({
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

export default NavBar;
