import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { connect } from 'react-redux';
import { withFirebase } from '../firebase';
import { setActiveNoteValueAction, storeEditorAction } from '../../actions';
import * as plugins from './plugins';
import * as blocks from './blocks';
import * as marks from './marks';

class Slate extends Component {
  constructor(props) {
    super(props);

    this.pluginList = [
      plugins.MarkHotKey({ key: 'b', type: 'bold' }),
      plugins.MarkHotKey({ key: 'i', type: 'italic' }),
      plugins.MarkHotKey({ key: 'u', type: 'underline' })
    ];

    this.ref = editor => {
      props.dispatch(storeEditorAction(editor));
    };
  }

  onChange = ({ value }) => {
    let user = this.props.firebase.auth.currentUser;
    this.props.dispatch(setActiveNoteValueAction(value));

    if (!user)
      return;

    this.props.firebase.saveUserNotesToDB(user, this.props.notesList);
  };

  renderBlock = (props, editor, next) => {
    switch (props.node.type) {
      case 'heading-one':
        return <blocks.HeadingOne {...props} />;
      case 'heading-two':
        return <blocks.HeadingTwo {...props} />;
      case 'bulleted-list':
        return <blocks.BulletedList {...props} />;
      case 'numbered-list':
        return <blocks.NumberedList {...props} />;
      case 'list-item':
        return <blocks.ListItem {...props} />;
      case 'block-quote':
        return <blocks.BlockQuote {...props} />;
      default:
        return next();
    }
  };

  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <marks.Bold {...props} />;
      case 'italic':
        return <marks.Italic {...props} />;
      case 'code':
        return <marks.Code {...props} />;
      case 'underline':
        return <marks.Underline {...props} />;
      default: {
        return next();
      }
    }
  };

  render() {
    return (
      <Editor
        ref={this.ref}
        plugins={this.pluginList}
        value={this.props.notesList[this.props.currentNoteIndex].value}
        onChange={this.onChange}
        renderBlock={this.renderBlock}
        renderMark={this.renderMark}
        autoFocus={true}
      />
    );
  }
}

const mapStateToProps = ({ notesList, currentNoteIndex }) => ({
  notesList,
  currentNoteIndex
});

export default connect(mapStateToProps)(withFirebase(Slate));
