import React, { Component, Fragment } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import {
  BoldMark,
  ItalicMark,
  CodeMark,
  BlockQuote,
  BulletedList,
  NumberedList,
  ListItem,
  HeadingOne,
  HeadingTwo,
  UnderlineMark,
  Toolbar
} from ".";
import Icon from "react-icons-kit";
import { ic_format_bold } from "react-icons-kit/md/ic_format_bold";
import { ic_format_italic } from "react-icons-kit/md/ic_format_italic";
import { ic_format_underlined } from "react-icons-kit/md/ic_format_underlined";
import { ic_code } from "react-icons-kit/md/ic_code";
import { ic_format_quote } from "react-icons-kit/md/ic_format_quote";
import { ic_format_list_bulleted } from "react-icons-kit/md/ic_format_list_bulleted";
import { ic_format_list_numbered } from "react-icons-kit/md/ic_format_list_numbered";
import { ic_looks_one } from "react-icons-kit/md/ic_looks_one";
import { ic_looks_two } from "react-icons-kit/md/ic_looks_two";

const DEFAULT_NODE = "paragraph";

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
                text: ""
              }
            ]
          }
        ]
      }
    ]
  }
});

function MarkHotKey(options) {
  const { key, type } = options;
  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, editor, next) {
      // If it doesn't match our `key`, let other plugins handle it.
      if (!event.metaKey || event.key !== key) return next();
      // Prevent the default characters from being inserted.
      event.preventDefault();
      // Toggle the mark `type`.
      editor.toggleMark(type);
    }
  };
}

const plugins = [
  MarkHotKey({ key: "b", type: "bold" }),
  MarkHotKey({ key: "i", type: "italic" }),
  MarkHotKey({ key: "u", type: "underline" })
];

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
        return <HeadingOne {...props} />;
      case "heading-two":
        return <HeadingTwo {...props} />;
      case "bulleted-list":
        return <BulletedList {...props} />;
      case "numbered-list":
        return <NumberedList {...props} />;
      case "list-item":
        return <ListItem {...props} />;
      case "block-quote":
        return <BlockQuote {...props} />;
      default:
        return next();
    }
  };

  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case "bold":
        return <BoldMark {...props} />;
      case "italic":
        return <ItalicMark {...props} />;
      case "code":
        return <CodeMark {...props} />;
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
        <Toolbar>
          <button
            onPointerDown={e => this.onMarkClick(e, "bold")}
            className="tooltip-icon-button"
          >
            <Icon icon={ic_format_bold} />
          </button>
          <button
            onPointerDown={e => this.onMarkClick(e, "italic")}
            className="tooltip-icon-button"
          >
            <Icon icon={ic_format_italic} />
          </button>
          <button
            onPointerDown={e => this.onMarkClick(e, "underline")}
            className="tooltip-icon-button"
          >
            <Icon icon={ic_format_underlined} />
          </button>
          <button
            onPointerDown={e => this.onMarkClick(e, "code")}
            className="tooltip-icon-button"
          >
            <Icon icon={ic_code} />
          </button>
          <button
            onPointerDown={e => this.onBlockClick(e, "block-quote")}
            className="tooltip-icon-button"
          >
            <Icon icon={ic_format_quote} />
          </button>
          <button
            onPointerDown={e => this.onBlockClick(e, "bulleted-list")}
            className="tooltip-icon-button"
          >
            <Icon icon={ic_format_list_bulleted} />
          </button>
          <button
            onPointerDown={e => this.onBlockClick(e, "numbered-list")}
            className="tooltip-icon-button"
          >
            <Icon icon={ic_format_list_numbered} />
          </button>
          <button
            onPointerDown={e => this.onBlockClick(e, "heading-one")}
            className="tooltip-icon-button"
          >
            <Icon icon={ic_looks_one} />
          </button>
          <button
            onPointerDown={e => this.onBlockClick(e, "heading-two")}
            className="tooltip-icon-button"
          >
            <Icon icon={ic_looks_two} />
          </button>
        </Toolbar>
        <Editor
          ref={this.ref}
          plugins={plugins}
          value={this.state.value}
          onChange={this.onChange}
          renderBlock={this.renderBlock}
          renderMark={this.renderMark}
          autoFocus={true}
        />
      </Fragment>
    );
  }
}
