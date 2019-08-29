import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import store from "../../store";
import Item from "./Item";
import NewNoteBtn from "./NewNoteBtn";
import { addNewNoteAction } from "../../actions";

class Navigator extends Component {
  componentWillMount() {
    if (this.props.notesList.length === 0) {
      store.dispatch(addNewNoteAction());
    }
  }

  getListOfItems(notesList) {
    let list = [];
    for (let note of notesList) {
      list.push(
        <Item
          title={note.title || "Untitled note"}
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

const mapStateToProps = state => {
  return {
    notesList: state.notesList
  };
};
export default connect(mapStateToProps)(Navigator);
