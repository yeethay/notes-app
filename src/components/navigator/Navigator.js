import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from './Item';
import NewNoteBtn from './NewNoteBtn';

class Navigator extends Component {
<<<<<<< HEAD
  componentWillMount() {
    if (this.props.notesList.length === 0) {
      store.dispatch(addNewNoteAction());
    }
  }

  getListOfItems(notesList, titlesList) {
=======
  getListOfItems(notesList) {
>>>>>>> master
    let list = [];
    for (let i = 0; i < notesList.length; i++) {
      list.push(
        <Item
<<<<<<< HEAD
          title={titlesList[i].title || "Untitled note"}
          preview={notesList[i].preview}
          active={notesList[i].active}
          id={notesList[i].id}
          key={notesList[i].id}
=======
          title={note.title || 'Untitled note'}
          preview={note.preview}
          active={note.active}
          id={note.id}
          key={note.id}
>>>>>>> master
        />
      )
    }
    return list;
  }

  render() {
    return (
      <Fragment>
        <NewNoteBtn />
<<<<<<< HEAD
        {this.getListOfItems(this.props.notesList, this.props.titlesList)}
      </div>
=======
        <div className="notes-list">
          {this.getListOfItems(this.props.notesList)}
        </div>
      </Fragment>
>>>>>>> master
    );
  }
}

<<<<<<< HEAD
const mapStateToProps = ({ notesList, titlesList }) => ({
  notesList,
  titlesList
});
=======
Navigator.propTypes = {
  notesList: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    notesList: state.notesList,
  };
};
>>>>>>> master
export default connect(mapStateToProps)(Navigator);
