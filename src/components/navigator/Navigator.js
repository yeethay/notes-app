import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from './Item';
import NewNoteBtn from './NewNoteBtn';

class Navigator extends Component {
  getListOfItems(notesList) {
    let list = [];
    for (let note of notesList) {
      list.push(
        <Item
          title={note.title || 'Untitled note'}
          preview={note.preview}
          active={note.active}
          id={note.id}
          key={note.id}
        />
      );
    }
    return list;
  }

  render() {
    return (
      <Fragment>
        <NewNoteBtn />
        <div className="notes-list">
          {this.getListOfItems(this.props.notesList)}
        </div>
      </Fragment>
    );
  }
}

Navigator.propTypes = {
  notesList: PropTypes.array,
  user: PropTypes.object,
};

const mapStateToProps = ({ notesList, user }) => ({ notesList, user });

export default connect(mapStateToProps)(Navigator);
