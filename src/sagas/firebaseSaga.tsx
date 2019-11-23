import { takeEvery, select, put, call, debounce, fork } from 'redux-saga/effects';
import * as types from '../actions/types';
import { getNotesList, getUser } from './selectors';
import { isEqual } from 'lodash';
import {
  updateSyncedStatusAction,
  updateUserAction,
  firebaseAuthStateChangedAction,
  updateUserNotesAction,
  firestoreChangeDetectedAction,
} from '../actions';
import CryptoJS from 'crypto-js';
import 'regenerator-runtime/runtime';
import { INotesList, INote, IEncryptedNote } from '../interfaces';

import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import config from './firebaseConfig';
import ReduxSagaFirebase from 'redux-saga-firebase';
import store from '../store';
import { Value } from 'slate';

const firebaseApp = firebase.initializeApp(config);
const rsf = new ReduxSagaFirebase(firebaseApp);
const authProvider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(user => {
  store.dispatch(firebaseAuthStateChangedAction(user));
});

export function* firebaseSaga() {
  yield takeEvery(types.FIREBASE_SIGNIN, signIn);
  yield takeEvery(types.FIREBASE_SIGNOUT, signOut);
  yield takeEvery(types.FIREBASE_AUTH_STATE_CHANGED, authStateChanged);
  yield takeEvery(types.DELETE_NOTE, firestoreDeleteNote);
  yield takeEvery(types.ADD_NEW_NOTE, firestoreAddNewNote);
  yield takeEvery(types.FIRESTORE_CHANGE_DETECTED, processFirestoreChanged);
  yield debounce(2000, types.SET_NOTE_ACTIVE, firestoreSetNoteActive);
  yield debounce(2000, types.SET_ACTIVE_NOTE_VALUE, firestoreSetActiveNoteValue);
  yield debounce(2000, types.SET_NOTE_TITLE, firestoreSetNoteTitle);
}

function* signIn() {
  try {
    yield call(rsf.auth.signInWithPopup, authProvider);
  } catch (err) {
    console.error(err);
  }
}

function* signOut() {
  try {
    yield call(rsf.auth.signOut);
  } catch (err) {
    console.error(err);
  }
}

function* authStateChanged({
  user,
}: {
  type: typeof types.FIREBASE_AUTH_STATE_CHANGED;
  user: firebase.User | null;
}) {
  yield put(updateUserAction(user));
  if (user) {
    yield call(getNotesListFromFirestore, user);
    yield fork(rsf.firestore.syncDocument as any, `notes/${user.email}`, {
      successActionCreator: (snapshot: firebase.firestore.DocumentSnapshot) =>
        firestoreChangeDetectedAction(snapshot, user),
      failureActionCreator: (err: any) => console.error(err),
    });
  }
}

function* getNotesListFromFirestore(user: firebase.User) {
  try {
    let document = yield rsf.firestore.getDocument(`notes/${user.email}`);
    let notesList = document.data();
    let secret = user.uid;
    if (notesList) {
      let ids = Object.keys(notesList);
      notesList = ids.reduce((result: INotesList, id: string) => {
        result[id] = decryptNote(notesList[id], secret);
        return result;
      }, {});
      yield put(updateUserNotesAction(notesList));
    }
  } catch (err) {
    console.error(err);
  }
}

function* firestoreSetActiveNoteValue({
  activeNoteId,
}: {
  type: typeof types.SET_ACTIVE_NOTE_VALUE;
  activeNoteId: string;
}) {
  try {
    let user = yield select(getUser);
    let notesList = yield select(getNotesList);
    let secret = user.uid;
    if (Object.keys(notesList).length > 0) {
      yield call(
        rsf.firestore.setDocument,
        `notes/${user.email}`,
        {
          [activeNoteId]: encryptNote(notesList[activeNoteId], secret),
        },
        { merge: true }
      );
    }
  } catch (err) {
    console.error(err);
  }
}

function* firestoreSetNoteActive({
  noteId,
}: {
  type: typeof types.SET_NOTE_ACTIVE;
  noteId: string;
}) {
  try {
    let user = yield select(getUser);
    let snapshot = yield call(rsf.firestore.getDocument, `notes/${user.email}`);
    let document = snapshot.data();
    let noteIds = Object.keys(document);
    let batch = noteIds.reduce((result: { [id: string]: {} }, id: string) => {
      result[id] = { active: id === noteId ? true : false };
      return result;
    }, {});
    yield call(rsf.firestore.setDocument, `notes/${user.email}`, batch, {
      merge: true,
    });
  } catch (err) {
    console.error(err);
  }
}

function* firestoreAddNewNote({ noteId }: { type: typeof types.ADD_NEW_NOTE; noteId: string }) {
  try {
    let user = yield select(getUser);
    let notesList = yield select(getNotesList);
    let snapshot = yield call(rsf.firestore.getDocument, `notes/${user.email}`);
    let document = snapshot.data();
    let noteIds = Object.keys(document);
    let batch = noteIds.reduce((result: { [id: string]: {} }, id: string) => {
      result[id] = { active: id === noteId ? true : false };
      return result;
    }, {});
    let secret = user.uid;
    batch = { ...batch, [noteId]: encryptNote(notesList[noteId], secret) };
    yield call(rsf.firestore.setDocument, `notes/${user.email}`, batch, {
      merge: true,
    });
  } catch (err) {
    console.error(err);
  }
}

function* firestoreDeleteNote({ noteId }: { type: typeof types.DELETE_NOTE; noteId: string }) {
  try {
    let user = yield select(getUser);
    yield call(rsf.firestore.updateDocument, `notes/${user.email}`, {
      [noteId]: firebase.firestore.FieldValue.delete(),
    });
  } catch (err) {
    console.error(err);
  }
}

function* firestoreSetNoteTitle({
  activeNoteId,
}: {
  type: typeof types.SET_NOTE_TITLE;
  activeNoteId: string;
}) {
  try {
    let notesList = yield select(getNotesList);
    let user = yield select(getUser);
    let secret = user.uid;
    yield call(
      rsf.firestore.setDocument,
      `notes/${user.email}`,
      {
        [activeNoteId]: encryptNote(notesList[activeNoteId], secret),
      },
      { merge: true }
    );
  } catch (err) {
    console.error(err);
  }
}

function* processFirestoreChanged({
  doc,
  user,
}: {
  type: typeof types.FIRESTORE_CHANGE_DETECTED;
  doc: firebase.firestore.DocumentSnapshot;
  user: firebase.User;
}) {
  let notesList = yield select(getNotesList);
  let remoteNotesList: { [id: string]: IEncryptedNote } | undefined = doc.data();
  let secret = user.uid;
  let decryptedNotesList = Object.keys(remoteNotesList as { [id: string]: IEncryptedNote }).reduce(
    (result: INotesList, id: string) => {
      result[id] = decryptNote(remoteNotesList![id], secret);
      return result;
    },
    {}
  );
  let equal = isEqual(notesList, decryptedNotesList);
  if (equal) {
    yield put(updateSyncedStatusAction(true));
  }
}

const encryptNote = (
  note: INote,
  secret: string
): { active: boolean; lastModified: number; data: string } => {
  return {
    active: note.active,
    lastModified: note.lastModified,
    data: CryptoJS.AES.encrypt(JSON.stringify(note.data), secret).toString(),
  };
};

const decryptNote = (
  note: { lastModified: number; active: boolean; data: string },
  secret: string
): INote => {
  let decrypted = {
    lastModified: note.lastModified,
    active: note.active,
    data: {
      ...JSON.parse(CryptoJS.AES.decrypt(note.data, secret).toString(CryptoJS.enc.Utf8)),
    },
  };
  decrypted.data.value = Value.fromJSON(decrypted.data.value);
  return decrypted;
};
