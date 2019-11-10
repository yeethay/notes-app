import React, { Component } from 'react';

import './NoteToolbar.css';

class NoteToolbar extends Component {
  render() {
    return <div className="format-toolbar" {...this.props} />;
  }
}

export default NoteToolbar;
