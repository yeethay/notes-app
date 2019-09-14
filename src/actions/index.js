import * as actionTypes from './types';

export function updateAuthStateAction(authState) {
  return { type: actionTypes.UPDATE_AUTH_STATE, authState };
}

export function addNewNoteAction() {
  return { type: actionTypes.ADD_NEW_NOTE };
}

export function setNoteActiveAction(noteId) {
  return { type: actionTypes.SET_NOTE_ACTIVE, noteId };
}

export function setActiveNoteValueAction(value) {
  return { type: actionTypes.SET_ACTIVE_NOTE_VALUE, value };
}

export function setNoteTitleAction(title) {
  return { type: actionTypes.SET_NOTE_TITLE, title };
}

export function setSavedTitles(titlesList) {
  return { type: actionTypes.SET_SAVED_TITLES, titlesList };
}

export function setSavedNotes(notesList) {
  return { type: actionTypes.SET_SAVED_NOTES, notesList };
}

export function storeEditorAction(editor) {
  return { type: actionTypes.STORE_EDITOR, editor };
}
