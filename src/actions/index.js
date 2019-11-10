import * as types from './types';

export const updateUserAction = user => ({ type: types.UPDATE_USER, user });

export const updateUserNotesAction = notesList => ({
  type: types.STORE_NOTES_LIST,
  notesList,
});

export const addNewNoteAction = () => ({
  type: types.ADD_NEW_NOTE,
});

export const setNoteActiveAction = noteId => ({
  type: types.SET_NOTE_ACTIVE,
  noteId,
});

export const setActiveNoteValueAction = ({
  activeNoteId,
  value,
  updateLastModified,
}) => ({
  type: types.SET_ACTIVE_NOTE_VALUE,
  activeNoteId,
  value,
  updateLastModified,
});

export const setNoteTitleAction = ({ activeNoteId, title }) => ({
  type: types.SET_NOTE_TITLE,
  activeNoteId,
  title,
});

export const removeAllNotesAction = () => ({
  type: types.REMOVE_ALL_NOTES,
});

export const updateSyncedStatusAction = ({ synced }) => ({
  type: types.UPDATE_SYNCED_STATUS,
  synced,
});

export const firestoreChangeDetectedAction = ({ doc }) => ({
  type: types.FIRESTORE_CHANGE_DETECTED,
  doc,
});
