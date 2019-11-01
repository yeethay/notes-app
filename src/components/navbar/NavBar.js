import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar, { Brand } from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SignIn from './SignIn';
import SignOut from './SignOut';
import { withFirebase } from '../firebase';

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

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(withFirebase(NavBar));
