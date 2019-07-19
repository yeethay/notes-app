import React, { Component } from "react";
import Navbar, { Brand } from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { withFirebase } from "./firebase";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: undefined
    };
  }

  componentDidMount() {
    if (!this.props.firebase) {
      return null;
    }

    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Brand href="#home">Notes For Now</Brand>
        <Nav className="mr-auto" />
        {this.state.loggedIn !== undefined &&
          (this.state.loggedIn === true ? <SignOut /> : <SignIn />)}
      </Navbar>
    );
  }
}

export default withFirebase(NavBar);
