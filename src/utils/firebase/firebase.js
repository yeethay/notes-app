import config from './config';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import store from '../../store';
import {
  updateUserAction,
  updateUserNotesAction,
  updateSyncedStatus,
} from '../../actions';
import { Value } from 'slate';

const NOTES_COLLECTION = 'notes';
const USERS_COLLECTION = 'users';

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

  saveUserNoteToDB = ({ user, noteId, notesList }) => {
    let docRef = this.notesRef(user);
    docRef.set(
      { [noteId]: JSON.parse(JSON.stringify(notesList[noteId])) },
      { merge: true }
    );
    store.dispatch(updateSyncedStatus({ syncedStatus: false }));
  };

  updateNotesListActiveFlags = ({ user, notesList }) => {
    let noteIds = Object.keys(notesList);
    let activeSubset = noteIds.reduce((result, id) => {
      result[id] = { active: notesList[id].active };
      return result;
    }, {});
    let docRef = this.notesRef(user);
    docRef.set(activeSubset, { merge: true });
  };

  listenForDBChanges = user => {
    let docRef = this.notesRef(user);
    docRef.onSnapshot({ includeMetadataChanges: true }, doc => {
      let source = doc.metadata.hasPendingWrites ? 'local' : 'server';
      console.log(source);
      if (source === 'server') {
        store.dispatch(updateSyncedStatus({ syncedStatus: true }));
      }
    });
  };

  getUserNotesFromDB = async user => {
    let docRef = this.notesRef(user);
    try {
      let doc = await docRef.get();
      let notesList = doc.data();
      if (notesList) {
        let ids = Object.keys(notesList);
        notesList = ids.reduce((result, id) => {
          result[id] = notesList[id];
          result[id].value = Value.fromJSON(notesList[id].value);
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
