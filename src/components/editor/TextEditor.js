import React, { Component, Fragment } from "react";
import { Editor } from "slate-react";
import store from "../../store";
import { connect } from "react-redux";
import { setActiveNoteValueAction } from "../../actions";
import { withFirebase } from "../firebase";

import * as blocks from "./blocks";
import * as marks from "./marks";
import * as icons from "./toolbar/icons";
import * as plugins from "./plugins";
import Toolbar from "./toolbar/Toolbar";
import ToolbarButton from "./toolbar/ToolbarButton";
import Title from "./Title";

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
  }

  ref = editor => {
    this.editor = editor;
  };

  getActiveNote = () => {
    return this.props.notesList[this.props.currentNoteIndex];
  };

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    let user = this.props.firebase.auth.currentUser;
    if (!user)
      return;

    if (value.document !== this.getActiveNote().value.document) {
      store.dispatch(setActiveNoteValueAction(value));
      this.props.firebase.setUserNotes(user, this.props.notesList);
    }
  };

  hasBlock = type => {
    const { value } = this.getActiveNote();
    return value.blocks.some(node => node.type === type);
  };

  hasMark = type => {
    const { value } = this.getActiveNote();
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

  renderMarkButton(type, icon) {
    return (
      <ToolbarButton
        active={this.hasMark(type)}
        onPointerDown={e => this.onMarkClick(e, type)}
        icon={icon}
      />
    );
  }

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (["numbered-list", "bulleted-list"].includes(type)) {
      let { document, blocks } = this.getActiveNote().value;
      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock("list-item") && parent && parent.type === type;
      }
    }

    return (
      <ToolbarButton
        active={isActive}
        onPointerDown={event => this.onBlockClick(event, type)}
        icon={icon}
      />
    );
  };

  render() {
    return (
      <Fragment>
        <Toolbar>
          {this.renderMarkButton("bold", icons.ic_format_bold)}
          {this.renderMarkButton("italic", icons.ic_format_italic)}
          {this.renderMarkButton("underline", icons.ic_format_underlined)}
          {this.renderMarkButton("code", icons.ic_code)}
          {this.renderBlockButton("block-quote", icons.ic_format_quote)}
          {this.renderBlockButton(
            "bulleted-list",
            icons.ic_format_list_bulleted
          )}
          {this.renderBlockButton(
            "numbered-list",
            icons.ic_format_list_numbered
          )}
          {this.renderBlockButton("heading-one", icons.ic_looks_one)}
          {this.renderBlockButton("heading-two", icons.ic_looks_two)}
        </Toolbar>
        <Title text={this.getActiveNote().title} />
        <Editor
          ref={this.ref}
          plugins={this.pluginList}
          value={this.getActiveNote().value}
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

export default connect(mapStateToProps)(withFirebase(TextEditor));
