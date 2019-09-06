import React, { Component } from "react";
import * as icons from "./icons";
import ToolbarButton from './ToolbarButton';
import { connect } from 'react-redux';

const DEFAULT_NODE = "paragraph";
class Toolbar extends Component {
  hasMark = type => {
    const { value } = this.props.notesList[this.props.currentNoteIndex];
    return value.activeMarks.some(mark => mark.type === type);
  };

  hasBlock = type => {
    const { value } = this.props.notesList[this.props.currentNoteIndex];
    return value.blocks.some(node => node.type === type);
  };

  onMarkClick = (event, type) => {
    event.preventDefault();
    this.props.editor.toggleMark(type);
  };

  onBlockClick = (event, type) => {
    event.preventDefault();

    const { editor } = this.props;
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
      let { document, blocks } = this.props.notesList[this.props.currentNoteIndex].value;
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
      <div className="format-toolbar">
        {this.renderMarkButton("bold", icons.ic_format_bold)}
        {this.renderMarkButton("italic", icons.ic_format_italic)}
        {this.renderMarkButton("underline", icons.ic_format_underlined)}
        {this.renderMarkButton("code", icons.ic_code)}
        {this.renderBlockButton("block-quote", icons.ic_format_quote)}
        {this.renderBlockButton("bulleted-list", icons.ic_format_list_bulleted)}
        {this.renderBlockButton("numbered-list", icons.ic_format_list_numbered)}
        {this.renderBlockButton("heading-one", icons.ic_looks_one)}
        {this.renderBlockButton("heading-two", icons.ic_looks_two)}
      </div>
    );
  }
}

const mapStateToProps = ({ notesList, currentNoteIndex, editor }) => ({
  notesList,
  currentNoteIndex,
  editor
});
export default connect(mapStateToProps)(Toolbar);
