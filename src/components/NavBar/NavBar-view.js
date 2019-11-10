import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar, { Brand } from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SignIn from '../SignIn';
import SignOut from '../SignOut';

class NavBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Brand href="#home">Notes For Now</Brand>
        <Nav className="mr-auto" />
        {this.props.user ? <SignOut /> : <SignIn />}
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  user: PropTypes.object,
};

export default NavBar;
