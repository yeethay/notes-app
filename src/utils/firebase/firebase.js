import config from './config';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import store from '../../store';
import {
  updateUserAction,
  updateUserNotesAction,
  firestoreChangeDetectedAction,
} from '../../actions';
import { Value } from 'slate';
import CryptoJS from 'crypto-js';
import { debounce } from 'lodash';

const NOTES_COLLECTION = 'notes';
const USERS_COLLECTION = 'users';
const DEBOUNCE_MILLISECONDS = 2000;

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();

    this.onAuthUserListener();
  }

  onAuthUserListener = () => {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        store.dispatch(updateUserAction(user));
        this.addUser(user);
        this.getUserNotesFromDB(user);
        this.listenForDBChanges(user);
      }
    });
  };

  signInPopup = provider => {
    this.auth.signInWithPopup(provider);
  };

  signOut = () => {
    this.auth.signOut();
    store.dispatch(updateUserAction(null));
  };

  addUser = async user => {
    let dbuser = {
      name: user.displayName,
    };
    await this.db
      .collection(USERS_COLLECTION)
      .doc(user.email)
      .set(dbuser);
  };

  saveUserNoteToDB = debounce(({ user, noteId, notesList }) => {
    let docRef = this.notesRef(user);
    let secret = user.uid;
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(notesList[noteId].value),
      secret
    ).toString();
    docRef.set(
      {
        [noteId]: {
          ...notesList[noteId],
          value: encrypted,
        },
      },
      { merge: true }
    );
  }, DEBOUNCE_MILLISECONDS);

  updateNotesListActiveFlags = debounce(({ user, notesList }) => {
    let noteIds = Object.keys(notesList);
    let activeSubset = noteIds.reduce((result, id) => {
      result[id] = { active: notesList[id].active };
      return result;
    }, {});
    let docRef = this.notesRef(user);
    docRef.set(activeSubset, { merge: true });
  }, DEBOUNCE_MILLISECONDS);

  listenForDBChanges = user => {
    let docRef = this.notesRef(user);
    docRef.onSnapshot({ includeMetadataChanges: true }, doc => {
      let source = doc.metadata.hasPendingWrites ? 'local' : 'server';
      if (source === 'server') {
        store.dispatch(firestoreChangeDetectedAction({ doc }));
      }
    });
  };

  getUserNotesFromDB = async user => {
    let docRef = this.notesRef(user);
    try {
      let doc = await docRef.get();
      let notesList = doc.data();
      let secret = user.uid;
      if (notesList) {
        let ids = Object.keys(notesList);
        notesList = ids.reduce((result, id) => {
          result[id] = notesList[id];
          result[id].value = Value.fromJSON(
            JSON.parse(
              CryptoJS.AES.decrypt(notesList[id].value, secret).toString(
                CryptoJS.enc.Utf8
              )
            )
          );
          return result;
        }, {});
        store.dispatch(updateUserNotesAction(notesList));
      }
    } catch (err) {
      console.error(err);
    }
  };

  notesRef = user => this.db.collection(NOTES_COLLECTION).doc(user.email);
}

export default Firebase;
