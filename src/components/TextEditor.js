import React, { Component, Fragment } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import {
  BoldMark,
  ItalicMark,
  CodeMark,
  ListMark,
  UnderlineMark,
  FormatToolbar
} from "./index";
import Icon from "react-icons-kit";
import { bold } from "react-icons-kit/feather/bold";
import { italic } from "react-icons-kit/feather/italic";
import { code } from "react-icons-kit/feather/code";
import { list } from "react-icons-kit/feather/list";
import { underline } from "react-icons-kit/feather/underline";

// Create our initial value...
const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "My first paragraph!"
              }
            ]
          }
        ]
      }
    ]
  }
});

export default class TextEditor extends Component {
  state = {
    value: initialValue
  };

  ref = editor => {
    this.editor = editor;
  };

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = (event, editor, next) => {
    if (!event.metaKey) return next();
    event.preventDefault();

    switch (event.key) {
      case "b": {
        editor.toggleMark("bold");
        return true;
      }
      case "i": {
        editor.toggleMark("italic");
        return true;
      }
      case "c": {
        editor.toggleMark("code");
        return true;
      }
      case "l": {
        editor.toggleMark("list");
        return true;
      }
      case "u": {
        editor.toggleMark("underline");
        return true;
      }
      default: {
        return next();
      }
    }
  };

  onMarkClick = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case "bold":
        return <BoldMark {...props} />;
      case "italic":
        return <ItalicMark {...props} />;
      case "code":
        return <CodeMark {...props} />;
      case "list":
        return <ListMark {...props} />;
      case "underline":
        return <UnderlineMark {...props} />;
      default: {
        return next();
      }
    }
  };

  render() {
    return (
      <Fragment>
        <FormatToolbar>
          <button
            onPointerDown={e => this.onMarkClick(e, "bold")}
            className="tooltip-icon-button"
          >
            <Icon icon={bold} />
          </button>
          <button
            onPointerDown={e => this.onMarkClick(e, "italic")}
            className="tooltip-icon-button"
          >
            <Icon icon={italic} />
          </button>
          <button
            onPointerDown={e => this.onMarkClick(e, "code")}
            className="tooltip-icon-button"
          >
            <Icon icon={code} />
          </button>
          <button
            onPointerDown={e => this.onMarkClick(e, "list")}
            className="tooltip-icon-button"
          >
            <Icon icon={list} />
          </button>
          <button
            onPointerDown={e => this.onMarkClick(e, "underline")}
            className="tooltip-icon-button"
          >
            <Icon icon={underline} />
          </button>
        </FormatToolbar>
        <Editor
          value={this.state.value}
          ref={this.ref}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
        />
      </Fragment>
    );
  }
}
