import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SignIn from '../SignIn';
import SignOut from '../SignOut';

interface IProps {
  user: firebase.User;
}

class NavBar extends Component<IProps> {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Notes For Now</Navbar.Brand>
        <Nav className="mr-auto" />
        {this.props.user ? <SignOut /> : <SignIn />}
      </Navbar>
    );
  }
}

export default NavBar;
