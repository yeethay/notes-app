import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setNoteActiveAction } from '../../actions';
import './NavigatorItem.css';

class NavigatorItem extends Component {
  componentDidUpdate() {
    let { user, notesList, firebase } = this.props;
    if (user) {
      firebase.updateNotesListActiveFlags({ user, notesList });
    }
  }

  onClick(noteId) {
    this.props.dispatch(setNoteActiveAction(noteId));
  }

  render() {
    let classes = classNames('navigator-item', {
      active: this.props.active,
    });

    const nbsp = '\u00A0';
    return (
      <div className={classes} onClick={() => this.onClick(this.props.id)}>
        <h4>{this.props.title || nbsp}</h4>
        <p>{this.props.preview || nbsp}</p>
      </div>
    );
  }
}

NavigatorItem.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
  title: PropTypes.string,
  preview: PropTypes.string,
  dispatch: PropTypes.func,
  user: PropTypes.object,
  notesList: PropTypes.object,
  firebase: PropTypes.object,
};

export default NavigatorItem;
