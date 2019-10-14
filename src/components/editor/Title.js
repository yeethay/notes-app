import React, { Component } from 'react';
import { setNoteTitleAction } from '../../actions';
import { withFirebase } from '../firebase';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles/Title.css';

class Title extends Component {
  onChange = event => {
    let newValue = event.target.value;
    this.props.dispatch(setNoteTitleAction(newValue));

    let user = this.props.firebase.auth.currentUser;
    if (!user)
      return;

    this.props.firebase.saveTitlesToDB(user, this.props.titlesList);
  };

  onKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };

  render() {
    return (
      <textarea
        maxLength={50}
        value={this.props.titlesList[this.props.currentNoteIndex].title}
        onChange={(event) => this.onChange(event)}
        onKeyDown={this.onKeyDown}
        placeholder="Untitled note"
      />
    );
  };
}

Title.propTypes = {
  text: PropTypes.node,
};

const mapStateToProps = ({ titlesList, currentNoteIndex }) => ({
  titlesList,
  currentNoteIndex
});

export default connect(mapStateToProps)(withFirebase(Title));
