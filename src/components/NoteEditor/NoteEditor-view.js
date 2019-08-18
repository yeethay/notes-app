import React, { Component, Fragment } from "react";
import { Editor } from "slate-react";
import { setActiveNoteValueAction } from "../../actions";

import * as blocks from "./Blocks";
import * as marks from "./Marks";
import * as icons from "../../utils/icons";
import * as plugins from "../../utils/slate/plugins";
import NoteToolbar from "../NoteToolbar";
import ToolbarButton from "../ToolbarButton";
import NoteTitle from "../NoteTitle";

import "./NoteEditor.css";

const DEFAULT_NODE = "paragraph";

class NoteEditor extends Component {
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
    this.props.dispatch(setActiveNoteValueAction(value));
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
        <NoteToolbar>
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
        </NoteToolbar>
        <NoteTitle text={this.getActiveNote().title} />
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

export default NoteEditor;
