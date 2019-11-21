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
import { INotesList } from '../../interfaces';

const NOTES_COLLECTION = 'notes';
const USERS_COLLECTION = 'users';
const DEBOUNCE_MILLISECONDS = 2000;

class Firebase {
  private auth: firebase.auth.Auth;
  private db: firebase.firestore.Firestore;

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

  signInPopup = (provider: firebase.auth.AuthProvider) => {
    this.auth.signInWithPopup(provider);
  };

  signOut = () => {
    this.auth.signOut();
    store.dispatch(updateUserAction(null));
  };

  addUser = async (user: firebase.User) => {
    let dbuser = {
      name: user.displayName,
    };
    await this.db
      .collection(USERS_COLLECTION)
      .doc(user.email || undefined)
      .set(dbuser);
  };

  saveUserNoteToDB = debounce((user, noteId, notesList) => {
    let docRef = this.notesRef(user);
    let secret = user.uid;
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(notesList[noteId].data),
      secret
    ).toString();
    docRef.set(
      {
        [noteId]: {
          ...notesList[noteId],
          data: encrypted,
        },
      },
      { merge: true }
    );
  }, DEBOUNCE_MILLISECONDS);
  deleteNote = (user: firebase.User, noteId: string) => {
    let docRef = this.notesRef(user);
    docRef.update({
      [noteId]: app.firestore.FieldValue.delete(),
    });
  };
  updateNotesListActiveFlags = debounce(({ user, notesList }) => {
    // let noteIds = Object.keys(notesList);
    // let activeSubset = noteIds.reduce((result: { [id: string]: {} }, id) => {
    //   result[id] = { active: notesList[id].active };
    //   return result;
    // }, {});
    // let docRef = this.notesRef(user);
    // docRef.set(activeSubset, { merge: true });
  }, DEBOUNCE_MILLISECONDS);

  listenForDBChanges = (user: firebase.User) => {
    let docRef = this.notesRef(user);
    docRef.onSnapshot({ includeMetadataChanges: true }, doc => {
      let source = doc.metadata.hasPendingWrites ? 'local' : 'server';
      if (source === 'server') {
        store.dispatch(firestoreChangeDetectedAction(doc, user));
      }
    });
  };

  getUserNotesFromDB = async (user: firebase.User) => {
    let docRef = this.notesRef(user);
    try {
      let doc = await docRef.get();
      let notesList = doc.data();
      let secret = user.uid;
      if (notesList) {
        let ids = Object.keys(notesList);
        notesList = ids.reduce((result: INotesList, id: string) => {
          if (notesList && notesList[id]) {
            result[id] = notesList[id];
            result[id].data = JSON.parse(
              CryptoJS.AES.decrypt(notesList[id].data, secret).toString(
                CryptoJS.enc.Utf8
              )
            );
          }
          result[id].data.value = Value.fromJSON(result[id].data.value);
          return result;
        }, {});
        store.dispatch(updateUserNotesAction(notesList));
      }
    } catch (err) {
      console.error(err);
    }
  };

  private notesRef = (
    user: firebase.User
  ): firebase.firestore.DocumentReference =>
    this.db.collection(NOTES_COLLECTION).doc(user.email || undefined);
}

export type FirebaseFunctions = {
  onAuthUserListener: Firebase['onAuthUserListener'];
  signInPopup: Firebase['signInPopup'];
  signOut: Firebase['signOut'];
  addUser: Firebase['addUser'];
  saveUserNoteToDB: Firebase['saveUserNoteToDB'];
  updateNotesListActiveFlags: Firebase['updateNotesListActiveFlags'];
  listenForDBChanges: Firebase['listenForDBChanges'];
  getUserNotesFromDB: Firebase['getUserNotesFromDB'];
  deleteNote: Firebase['deleteNote'];
};

export default Firebase;
