import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { withFirebase } from "../firebase";

class SignOut extends Component {
  onClick = () => {
    this.props.firebase.signOut();
  };

  render() {
    return (
      <div>
        <Button onClick={this.onClick}>Sign Out</Button>
      </div>
    );
  }
}

export default withFirebase(SignOut);
