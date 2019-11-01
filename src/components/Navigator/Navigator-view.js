import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigatorItem from '../NavigatorItem';
import NewNoteButton from '../NewNoteButton';

class Navigator extends Component {
  getListOfItems(notesList) {
    let list = [];
    Object.keys(notesList).map(key =>
      list.push(
        <NavigatorItem
          title={notesList[key].title || 'Untitled note'}
          preview={notesList[key].preview}
          active={notesList[key].active}
          id={key}
          key={key}
        />
      )
    );
    return list;
  }

  render() {
    return (
      <Fragment>
        <NewNoteButton />
        <div className="notes-list">
          {this.getListOfItems(this.props.notesList)}
        </div>
      </Fragment>
    );
  }
}

Navigator.propTypes = {
  notesList: PropTypes.object,
  user: PropTypes.object,
};

export default Navigator;
