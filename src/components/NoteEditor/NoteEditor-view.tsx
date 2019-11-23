import React, { Component, Fragment } from 'react';
import { Editor, RenderBlockProps, RenderMarkProps } from 'slate-react';
import { setActiveNoteValueAction, updateSyncedStatusAction } from '../../actions';

import * as icons from '../../utils/icons';
import * as plugins from '../../utils/slate/plugins';
import NoteToolbar from '../NoteToolbar';
import ToolbarButton from '../ToolbarButton';
import NoteTitle from '../NoteTitle';
import LastModified from '../LastModified';
import { INotesList, INote } from '../../interfaces';

import './NoteEditor.css';
import { Value, Block, Document } from 'slate';
import { ActionTypes } from '../../actions/types';
import initialValue from '../../utils/slate/initialValue';

const DEFAULT_NODE = 'paragraph';

interface IProps {
  user: firebase.User;
  notesList: INotesList;
  dispatch: (arg0: ActionTypes) => void;
  synced: boolean;
}

class NoteEditor extends Component<IProps> {
  private pluginList: any;
  private editor: any;

  constructor(props: IProps) {
    super(props);

    this.pluginList = [
      plugins.MarkHotKey({ key: 'b', type: 'bold' }),
      plugins.MarkHotKey({ key: 'i', type: 'italic' }),
      plugins.MarkHotKey({ key: 'u', type: 'underline' }),
    ];
  }

  ref = (editor: any): void => {
    this.editor = editor;
  };

  getActiveNote = (): INote | undefined => {
    let { notesList } = this.props;
    return Object.values(notesList).find(note => note.active);
  };

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }: { value: Value }): void => {
    let activeNoteId = Object.keys(this.props.notesList).find(
      key => this.props.notesList[key].active === true
    );
    let activeNote = this.getActiveNote();
    if (!activeNoteId || !activeNote) {
      return;
    }

    let changed = activeNote.data.value.document !== value.document;
    if (changed && this.props.user) {
      this.props.dispatch(updateSyncedStatusAction(false));
    }

    let updateLastModified = changed;

    let preview = (value.toJSON().document!.nodes![0] as any).nodes[0].text;

    this.props.dispatch(setActiveNoteValueAction(activeNoteId, value, updateLastModified, preview));
  };

  hasBlock = (type: string): boolean => {
    let activeNote = this.getActiveNote();
    if (activeNote) {
      const { value } = activeNote.data;
      return value.blocks.some(node => {
        if (!node) {
          return false;
        }
        return node.type === type;
      });
    }
    return false;
  };

  hasMark = (type: string): boolean => {
    let activeNote = this.getActiveNote();
    if (activeNote) {
      const { value } = activeNote.data;
      return value.activeMarks.some(mark => {
        if (!mark) {
          return false;
        }
        return mark.type === type;
      });
    }
    return false;
  };

  onBlockClick = (event: PointerEvent, type: string) => {
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
      const isType = value.blocks.some((block: Block) => {
        return !!document.getClosest(block.key, (parent: Document) => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        editor
          .unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
          .wrapBlock(type);
      } else {
        editor.setBlocks('list-item').wrapBlock(type);
      }
    }
  };

  onMarkClick = (event: PointerEvent, type: string) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  renderBlock = (props: RenderBlockProps, editor: any, next: () => any): any => {
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

  renderMark = (props: RenderMarkProps, editor: any, next: () => any): any => {
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

  renderMarkButton(type: string, icon: any) {
    return (
      <ToolbarButton
        active={this.hasMark(type)}
        onPointerDown={(e: PointerEvent) => this.onMarkClick(e, type)}
        icon={icon}
      />
    );
  }

  renderBlockButton = (type: string, icon: any) => {
    let isActive = this.hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      let activeNote = this.getActiveNote();
      if (!activeNote) {
        return;
      }
      let { document, blocks } = activeNote.data.value;
      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive =
          (this.hasBlock('list-item') && parent && (parent as { type: any }).type === type) ||
          false;
      }
    }

    return (
      <ToolbarButton
        active={isActive}
        onPointerDown={(event: PointerEvent) => this.onBlockClick(event, type)}
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
          <NoteTitle text={(this.getActiveNote() || { data: { title: '' } }).data.title} />
          <NoteToolbar>
            {this.renderMarkButton('bold', icons.ic_format_bold)}
            {this.renderMarkButton('italic', icons.ic_format_italic)}
            {this.renderMarkButton('underline', icons.ic_format_underlined)}
            {this.renderMarkButton('code', icons.ic_code)}
            {this.renderBlockButton('block-quote', icons.ic_format_quote)}
            {this.renderBlockButton('bulleted-list', icons.ic_format_list_bulleted)}
            {this.renderBlockButton('numbered-list', icons.ic_format_list_numbered)}
            {this.renderBlockButton('heading-one', icons.ic_looks_one)}
            {this.renderBlockButton('heading-two', icons.ic_looks_two)}
          </NoteToolbar>
          <Editor
            ref={this.ref}
            plugins={this.pluginList}
            value={(this.getActiveNote() || { data: { value: initialValue } }).data.value}
            onChange={this.onChange}
            renderBlock={this.renderBlock}
            renderMark={this.renderMark}
            autoFocus={true}
          />
          <LastModified
            date={(this.getActiveNote() || { lastModified: new Date().getTime() }).lastModified}
            user={this.props.user}
            synced={this.props.synced}
          />
        </Fragment>
      );
    }
  }
}

export default NoteEditor;
