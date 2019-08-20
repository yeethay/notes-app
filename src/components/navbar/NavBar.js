import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar, { Brand } from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import store from "../../store";
import { updateAuthStateAction, setSavedNotes } from "../../actions";
import { withFirebase } from "../firebase";

class NavBar extends Component {
  componentWillMount() {
    if (!this.props.firebase) {
      return null;
    }

    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        store.dispatch(
          updateAuthStateAction({
            loggedIn: true
          })
        );
        this.props.firebase.addUser(user);
        let docRef = this.props.firebase.db.collection("notes").doc(user.email);
        // docRef.get().then(function(doc) {
          // if (doc.exists) {
              // console.log(doc.data());
              // store.dispatch(setSavedNotes({notesList: doc.data().notesList}));
          // } else {
              // store.dispatch(setSavedNotes({notesList: null}));
          // }
        // }).catch(function(error) {
          // console.log("Error getting document:", error);
        // });
      } else {
        store.dispatch(
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

const mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

export default connect(mapStateToProps)(withFirebase(NavBar));
