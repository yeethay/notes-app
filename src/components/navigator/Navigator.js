import React, { Component } from "react";
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

  getListOfItems(notesList, titlesList) {
    let list = [];
    for (let i = 0; i < notesList.length; i++) {
      list.push(
        <Item
          title={titlesList[i].title || "Untitled note"}
          preview={notesList[i].preview}
          active={notesList[i].active}
          id={notesList[i].id}
          key={notesList[i].id}
        />
      )
    }
    return list;
  }

  render() {
    return (
      <div>
        <NewNoteBtn />
        {this.getListOfItems(this.props.notesList, this.props.titlesList)}
      </div>
    );
  }
}

const mapStateToProps = ({ notesList, titlesList }) => ({
  notesList,
  titlesList
});
export default connect(mapStateToProps)(Navigator);
