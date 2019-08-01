import React, { Component } from "react";
import store from "../../store";
import classNames from "classnames";
import { setNoteActiveAction } from "../../actions";
import "./styles/Item.css";

export default class Item extends Component {
  onClick(noteId) {
    store.dispatch(setNoteActiveAction(noteId));
  }

  render() {
    let classes = classNames("navigator-item", {
      active: this.props.active
    });

    return (
      <div className={classes} onClick={() => this.onClick(this.props.id)}>
        <h4>{this.props.title}</h4>
        <p>{this.props.preview}</p>
      </div>
    );
  }
}
