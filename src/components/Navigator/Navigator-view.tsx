import React, { Component, Fragment } from 'react';
import NavigatorItem from '../NavigatorItem';
import NewNoteButton from '../NewNoteButton';
import './Navigator.css';
import { INotesList } from '../../interfaces';

interface IProps {
  notesList: INotesList;
}

class Navigator extends Component<IProps> {
  getListOfItems(notesList: INotesList) {
    let list: any = [];
    Object.keys(notesList)
      .sort((a, b) =>
        notesList[a].lastModified < notesList[b].lastModified ? 1 : -1
      )
      .map(key =>
        list.push(
          <NavigatorItem
            title={notesList[key].data.title || 'Untitled note'}
            preview={notesList[key].data.preview}
            active={notesList[key].active}
            id={key}
            key={key}
          />
        )
      );
    return list;
  }

  render() {
    return (
      <Fragment>
        <NewNoteButton />
        <div className="notes-list">
          {this.getListOfItems(this.props.notesList)}
        </div>
      </Fragment>
    );
  }
}

export default Navigator;
