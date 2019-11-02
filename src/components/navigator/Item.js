import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from '../firebase';
import PropTypes from 'prop-types';
import store from '../../store';
import classNames from 'classnames';
import { setNoteActiveAction } from '../../actions';
import './styles/Item.css';

class Item extends Component {
  onClick(noteId) {
    store.dispatch(setNoteActiveAction(noteId));
    let { user, notesList } = this.props;
    this.props.firebase.updateNotesListActiveFlags({ user, notesList });
  }

  render() {
    let classes = classNames('navigator-item', {
      active: this.props.active,
    });

    return (
      <div className={classes} onClick={() => this.onClick(this.props.id)}>
        <h4>{this.props.title}&nbsp;</h4>
        <p>{this.props.preview}&nbsp;</p>
      </div>
    );
  }
}

Item.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
  title: PropTypes.string,
  preview: PropTypes.string,
};

const mapStateToProps = ({ user, notesList }) => ({ user, notesList });

export default connect(mapStateToProps)(withFirebase(Item));
