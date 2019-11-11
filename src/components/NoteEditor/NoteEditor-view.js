import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'slate-react';
import {
  setActiveNoteValueAction,
  updateSyncedStatusAction,
} from '../../actions';

import * as icons from '../../utils/icons';
import * as plugins from '../../utils/slate/plugins';
import NoteToolbar from '../NoteToolbar';
import ToolbarButton from '../ToolbarButton';
import NoteTitle from '../NoteTitle';
import LastModified from '../LastModified';

import './NoteEditor.css';

const DEFAULT_NODE = 'paragraph';

class NoteEditor extends Component {
  constructor(props) {
    super(props);

    this.pluginList = [
      plugins.MarkHotKey({ key: 'b', type: 'bold' }),
      plugins.MarkHotKey({ key: 'i', type: 'italic' }),
      plugins.MarkHotKey({ key: 'u', type: 'underline' }),
    ];
  }

  componentDidUpdate() {
    let { user, notesList, firebase } = this.props;
    if (user && Object.keys(notesList).length > 0) {
      let noteId = Object.keys(notesList).find(key => notesList[key].active);
      firebase.saveUserNoteToDB({ user, noteId, notesList });
    }
  }

  ref = editor => {
    this.editor = editor;
  };

  getActiveNote = () => {
    let { notesList } = this.props;
    return Object.values(notesList).find(note => note.active);
  };

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    let activeNoteId = Object.keys(this.props.notesList).find(
      key => this.props.notesList[key].active === true
    );
    let changed = this.getActiveNote().data.value.document !== value.document;
    if (changed && this.props.user) {
      this.props.dispatch(updateSyncedStatusAction({ synced: false }));
    }

    this.props.dispatch(
      setActiveNoteValueAction({
        activeNoteId,
        value,
        updateLastModified: changed,
      })
    );
  };

  hasBlock = type => {
    const { value } = this.getActiveNote().data;
    return value.blocks.some(node => node.type === type);
  };

  hasMark = type => {
    const { value } = this.getActiveNote().data;
    return value.activeMarks.some(mark => mark.type === type);
  };

  onBlockClick = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks('list-item').wrapBlock(type);
      }
    }
  };

  onMarkClick = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  renderBlock = (props, editor, next) => {
    switch (props.node.type) {
      case 'heading-one':
        return <h1 {...props.attributes}>{props.children}</h1>;
      case 'heading-two':
        return <h2 {...props.attributes}>{props.children}</h2>;
      case 'bulleted-list':
        return <ul {...props.attributes}>{props.children}</ul>;
      case 'numbered-list':
        return <ol {...props.attributes}>{props.children}</ol>;
      case 'list-item':
        return <li {...props.attributes}>{props.children}</li>;
      case 'block-quote':
        return <blockquote {...props.attributes}>{props.children}</blockquote>;
      default:
        return next();
    }
  };

  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <strong {...props.attributes}>{props.children}</strong>;
      case 'italic':
        return (
          <em property="italic" {...props.attributes}>
            {props.children}
          </em>
        );
      case 'code':
        return <code {...props.attributes}>{props.children}</code>;
      case 'underline':
        return <u {...props.attributes}>{props.children}</u>;
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

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      let { document, blocks } = this.getActiveNote().data.value;
      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock('list-item') && parent && parent.type === type;
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
    if (Object.keys(this.props.notesList).length < 1) {
      return null;
    } else {
      return (
        <Fragment>
          <NoteTitle text={this.getActiveNote().data.title} />
          <NoteToolbar>
            {this.renderMarkButton('bold', icons.ic_format_bold)}
            {this.renderMarkButton('italic', icons.ic_format_italic)}
            {this.renderMarkButton('underline', icons.ic_format_underlined)}
            {this.renderMarkButton('code', icons.ic_code)}
            {this.renderBlockButton('block-quote', icons.ic_format_quote)}
            {this.renderBlockButton(
              'bulleted-list',
              icons.ic_format_list_bulleted
            )}
            {this.renderBlockButton(
              'numbered-list',
              icons.ic_format_list_numbered
            )}
            {this.renderBlockButton('heading-one', icons.ic_looks_one)}
            {this.renderBlockButton('heading-two', icons.ic_looks_two)}
          </NoteToolbar>
          <Editor
            ref={this.ref}
            plugins={this.pluginList}
            value={this.getActiveNote().data.value}
            onChange={this.onChange}
            renderBlock={this.renderBlock}
            renderMark={this.renderMark}
            autoFocus={true}
          />
          <LastModified date={this.getActiveNote().lastModified} />
        </Fragment>
      );
    }
  }
}

NoteEditor.propTypes = {
  notesList: PropTypes.object,
  user: PropTypes.object,
  firebase: PropTypes.object,
  dispatch: PropTypes.func,
};

export default NoteEditor;
