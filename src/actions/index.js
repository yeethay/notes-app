import * as types from './types';

export function updateUserAction(user) {
  return { type: types.UPDATE_USER, user };
}

export function updateUserNotesAction(notesList) {
  return { type: types.STORE_NOTES_LIST, notesList };
}

export function addNewNoteAction() {
  return { type: types.ADD_NEW_NOTE };
}

export function setNoteActiveAction(noteId) {
  return { type: types.SET_NOTE_ACTIVE, noteId };
}

export function setActiveNoteValueAction(value) {
  return { type: types.SET_ACTIVE_NOTE_VALUE, value };
}

export function setNoteTitleAction(title) {
  return { type: types.SET_NOTE_TITLE, title };
}

export function removeAllNotesAction() {
  return { type: types.REMOVE_ALL_NOTES };
}
