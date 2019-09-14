import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import Item from './Item';
import NewNoteBtn from './NewNoteBtn';
import { addNewNoteAction } from '../../actions';

class Navigator extends Component {
  componentWillMount() {
    if (this.props.notesList.length === 0) {
      store.dispatch(addNewNoteAction());
    }
  }

  getListOfItems(titlesList, notesList) {
    let list = [];
    for (let i = 0; i < notesList.length; i++) {
      let note = notesList[i];
      let titlePreview = titlesList[i].title;
      list.push(
        <Item
          title={titlePreview || 'Untitled note'}
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
      <div>
        <NewNoteBtn />
        {this.getListOfItems(this.props.titlesList, this.props.notesList)}
      </div>
    );
  }
}

const mapStateToProps = ({notesList, titlesList}) => ({
  notesList,
  titlesList
});

export default connect(mapStateToProps)(Navigator);
