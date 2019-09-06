import * as types from './types';

export function updateAuthStateAction(authState) {
  return { type: types.UPDATE_AUTH_STATE, authState };
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
