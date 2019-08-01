import React, { Component, Fragment } from "react";
import { Editor } from "slate-react";
import store from "../../store";
import { connect } from "react-redux";
import { setActiveNoteValueAction } from "../../actions";

import * as blocks from "./blocks";
import * as marks from "./marks";
import * as icons from "./toolbar/icons";
import * as plugins from "./plugins";
import Toolbar from "./toolbar/Toolbar";

import "./TextEditor.css";

const DEFAULT_NODE = "paragraph";

class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.pluginList = [
      plugins.MarkHotKey({ key: "b", type: "bold" }),
      plugins.MarkHotKey({ key: "i", type: "italic" }),
      plugins.MarkHotKey({ key: "u", type: "underline" })
    ];

    this.toolbarButtons = {
      bold: {
        onPointerDown: e => this.onMarkClick(e, "bold"),
        icon: icons.ic_format_bold
      },
      italic: {
        onPointerDown: e => this.onMarkClick(e, "italic"),
        icon: icons.ic_format_italic
      },
      underline: {
        onPointerDown: e => this.onMarkClick(e, "underline"),
        icon: icons.ic_format_underlined
      },
      code: {
        onPointerDown: e => this.onMarkClick(e, "code"),
        icon: icons.ic_code
      },
      blockquote: {
        onPointerDown: e => this.onBlockClick(e, "block-quote"),
        icon: icons.ic_format_quote
      },
      bulletedList: {
        onPointerDown: e => this.onBlockClick(e, "bulleted-list"),
        icon: icons.ic_format_list_bulleted
      },
      numberedList: {
        onPointerDown: e => this.onBlockClick(e, "numbered-list"),
        icon: icons.ic_format_list_numbered
      },
      headingOne: {
        onPointerDown: e => this.onBlockClick(e, "heading-one"),
        icon: icons.ic_looks_one
      },
      headingTwo: {
        onPointerDown: e => this.onBlockClick(e, "heading-two"),
        icon: icons.ic_looks_two
      }
    };
  }

  ref = editor => {
    this.editor = editor;
  };

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    store.dispatch(setActiveNoteValueAction(value));
  };

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  };

  onBlockClick = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== "bulleted-list" && type !== "numbered-list") {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock("list-item");

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item");
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else if (isList) {
        editor
          .unwrapBlock(
            type === "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks("list-item").wrapBlock(type);
      }
    }
  };

  onMarkClick = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  renderBlock = (props, editor, next) => {
    switch (props.node.type) {
      case "heading-one":
        return <blocks.HeadingOne {...props} />;
      case "heading-two":
        return <blocks.HeadingTwo {...props} />;
      case "bulleted-list":
        return <blocks.BulletedList {...props} />;
      case "numbered-list":
        return <blocks.NumberedList {...props} />;
      case "list-item":
        return <blocks.ListItem {...props} />;
      case "block-quote":
        return <blocks.BlockQuote {...props} />;
      default:
        return next();
    }
  };

  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case "bold":
        return <marks.Bold {...props} />;
      case "italic":
        return <marks.Italic {...props} />;
      case "code":
        return <marks.Code {...props} />;
      case "underline":
        return <marks.Underline {...props} />;
      default: {
        return next();
      }
    }
  };

  render() {
    return (
      <Fragment>
        <Toolbar buttons={this.toolbarButtons} />
        <Editor
          ref={this.ref}
          plugins={this.pluginList}
          value={this.props.notesList[this.props.currentNoteIndex].value}
          onChange={this.onChange}
          renderBlock={this.renderBlock}
          renderMark={this.renderMark}
          autoFocus={true}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    notesList: state.notesList,
    currentNoteIndex: state.currentNoteIndex
  };
};

export default connect(mapStateToProps)(TextEditor);
