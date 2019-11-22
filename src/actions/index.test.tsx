import * as actions from '.';
import * as types from './types';
import uuid from 'uuid/v4';
import { INotesList } from '../interfaces';
import initialValue from '../utils/slate/initialValue';

describe('actions', () => {
  it('should create an action to update user', () => {
    const user: any = {};
    const expectedAction = {
      type: types.UPDATE_USER,
      user,
    };
    expect(actions.updateUserAction(user)).toEqual(expectedAction);
  });

  it('should create an action to add a new note', () => {
    const id = uuid();
    const expectedAction = {
      type: types.ADD_NEW_NOTE,
      noteId: id,
    };
    expect(actions.addNewNoteAction(id)).toEqual(expectedAction);
  });

  it('should create an action to set a note active', () => {
    let noteId = '0';
    const expectedAction = {
      type: types.SET_NOTE_ACTIVE,
      noteId,
    };
    expect(actions.setNoteActiveAction(noteId)).toEqual(expectedAction);
  });

  it('should create an action to set a note value', () => {
    let value: any = {};
    let activeNoteId = uuid();
    let updateLastModified = undefined;
    let preview = undefined;
    const expectedAction = {
      type: types.SET_ACTIVE_NOTE_VALUE,
      value,
      activeNoteId,
    };
    expect(
      actions.setActiveNoteValueAction(
        activeNoteId,
        value,
        updateLastModified as any,
        preview as any
      )
    ).toEqual(expectedAction);
  });

  it('should create an action to set a note title', () => {
    let title = 'Title';
    let activeNoteId = uuid();
    const expectedAction = {
      type: types.SET_NOTE_TITLE,
      activeNoteId,
      title,
    };
    expect(actions.setNoteTitleAction(activeNoteId, title)).toEqual(
      expectedAction
    );
  });

  it('should create an action to update user notes', () => {
    const notesList: INotesList = {
      [uuid()]: {
        data: {
          title: '',
          preview: '',
          value: initialValue,
        },
        active: true,
        lastModified: 123456789,
      },
    };
    const expectedAction = {
      type: types.STORE_NOTES_LIST,
      notesList,
    };
    expect(actions.updateUserNotesAction(notesList)).toEqual(expectedAction);
  });

  it('should create an action to remove all notes', () => {
    const expectedAction = {
      type: types.REMOVE_ALL_NOTES,
    };
    expect(actions.removeAllNotesAction()).toEqual(expectedAction);
  });
});
