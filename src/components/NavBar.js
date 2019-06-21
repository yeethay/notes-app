import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SignIn from "./SignIn";

class NavBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Notes For Now</Navbar.Brand>
        <Nav className="mr-auto" />
        <SignIn />
      </Navbar>
    );
  }
}
export default NavBar;
