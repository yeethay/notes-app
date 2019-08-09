import React, { Component } from "react";
import NavigatorItem from "../NavigatorItem";
import NewNoteButton from "../NewNoteButton";
import { addNewNoteAction } from "../../actions";

class Navigator extends Component {
  componentWillMount() {
    if (this.props.notesList.length === 0) {
      this.props.dispatch(addNewNoteAction());
    }
  }

  getListOfItems(notesList) {
    let list = [];
    for (let note of notesList) {
      list.push(
        <NavigatorItem
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
      <div>
        <NewNoteButton />
        {this.getListOfItems(this.props.notesList)}
      </div>
    );
  }
}

export default Navigator;
