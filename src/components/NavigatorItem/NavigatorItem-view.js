import React, { Component } from "react";
import classNames from "classnames";
import { setNoteActiveAction } from "../../actions";
import "./NavigatorItem.css";

export default class NavigatorItem extends Component {
  onClick(noteId) {
    this.props.dispatch(setNoteActiveAction(noteId));
  }

  render() {
    let classes = classNames("navigator-item", {
      active: this.props.active
    });

    const nbsp = "\u00A0";
    return (
      <div className={classes} onClick={() => this.onClick(this.props.id)}>
        <h4>{this.props.title || nbsp}</h4>
        <p>{this.props.preview || nbsp}</p>
      </div>
    );
  }
}
