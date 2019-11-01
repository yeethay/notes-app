import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from './Item';
import NewNoteBtn from './NewNoteBtn';

class Navigator extends Component {
  getListOfItems(notesList) {
    let list = [];
    Object.keys(notesList)
      .sort((a, b) =>
        notesList[a].lastModified < notesList[b].lastModified ? 1 : -1
      )
      .map(key =>
        list.push(
          <Item
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
        <NewNoteBtn />
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

const mapStateToProps = ({ notesList, user }) => ({ notesList, user });

export default connect(mapStateToProps)(Navigator);
