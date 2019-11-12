import { INotesList } from '../interfaces';
import { Value } from 'slate';
import { removeAllNotesAction } from '.';

export const UPDATE_USER = 'UPDATE_USER';
interface updateUserAction {
  type: typeof UPDATE_USER;
  user: firebase.User | null;
}

export const ADD_NEW_NOTE = 'ADD_NEW_NOTE';
interface addNewNoteAction {
  type: typeof ADD_NEW_NOTE;
}

export const SET_NOTE_ACTIVE = 'SET_NOTE_ACTIVE';
interface setNoteActiveAction {
  type: typeof SET_NOTE_ACTIVE;
  noteId: string;
}

export const SET_ACTIVE_NOTE_VALUE = 'SET_ACTIVE_NOTE_VALUE';
interface setActiveNoteValueAction {
  type: typeof SET_ACTIVE_NOTE_VALUE;
  value: Value;
  activeNoteId: string;
  updateLastModified: boolean;
  preview: string;
}

export const SET_NOTE_TITLE = 'SET_NOTE_TITLE';
interface setNoteTitleAction {
  type: typeof SET_NOTE_TITLE;
  title: string;
  activeNoteId: string;
}

export const STORE_NOTES_LIST = 'STORE_NOTES_LIST';
interface storeNotesListAction {
  type: typeof STORE_NOTES_LIST;
  notesList: INotesList;
}

export const REMOVE_ALL_NOTES = 'REMOVE_ALL_NOTES';
interface removeAllNotesAction {
  type: typeof REMOVE_ALL_NOTES;
}

export const UPDATE_SYNCED_STATUS = 'UPDATE_SYNCED_STATUS';
interface updateSyncedStatusAction {
  type: typeof UPDATE_SYNCED_STATUS;
  synced: boolean;
}

export const FIRESTORE_CHANGE_DETECTED = 'FIRESTORE_CHANGE_DETECTED';
interface firestoreChangeDetectedAction {
  type: typeof FIRESTORE_CHANGE_DETECTED;
  doc: firebase.firestore.DocumentSnapshot;
  user: firebase.User;
}

export type ActionTypes =
  | updateUserAction
  | setNoteActiveAction
  | setActiveNoteValueAction
  | setNoteTitleAction
  | addNewNoteAction
  | storeNotesListAction
  | removeAllNotesAction
  | updateSyncedStatusAction
  | firestoreChangeDetectedAction;
