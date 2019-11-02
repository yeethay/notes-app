import config from './config';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import store from '../../store';
import { updateUserAction, updateUserNotesAction } from '../../actions';
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
        this.updateUserNotesFromDB(user);
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
      {
        [noteId]: JSON.parse(JSON.stringify(notesList[noteId])),
      },
      { merge: true }
    );
  };

  updateNotesListActiveFlags = ({ user, notesList }) => {
    let docRef = this.notesRef(user);
    Object.keys(notesList).forEach(noteId => {
      docRef.set(
        {
          [noteId]: { active: notesList[noteId].active },
        },
        { merge: true }
      );
    });
  };

  updateUserNotesFromDB = user => {
    let docRef = this.notesRef(user);
    docRef.onSnapshot(doc => {
      let notesList = doc.data();
      if (notesList && !doc.metadata.hasPendingWrites) {
        notesList = Object.keys(notesList).reduce((result, key) => {
          result[key] = notesList[key];
          result[key].value = Value.fromJSON(notesList[key].value);
          return result;
        }, {});
        store.dispatch(updateUserNotesAction(notesList));
      }
    });
  };

  notesRef = user => this.db.collection(NOTES_COLLECTION).doc(user.email);
}

export default Firebase;
