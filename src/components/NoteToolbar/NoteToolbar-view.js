import React, { Component } from "react";
import Icon from "react-icons-kit";

class NoteToolbar extends Component {
  getButtonsList() {
    let buttons = [];

    for (let key in this.props.buttons) {
      buttons.push(
        <button
          key={key}
          onPointerDown={this.props.buttons[key].onPointerDown}
          className="tooltip-icon-button"
        >
          <Icon icon={this.props.buttons[key].icon} />
        </button>
      );
    }

    return buttons;
  }

  render() {
    return <div className="format-toolbar">{this.getButtonsList()}</div>;
  }
}

export default NoteToolbar;
