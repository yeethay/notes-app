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

    this.auth.onAuthStateChanged(async user => {
      store.dispatch(updateUserAction(user));
      if (user) {
        this.addUser(user);

        let notesList = await this.getUserNotesFromDB(user);
        if (notesList) {
          store.dispatch(
            updateUserNotesAction(
              notesList.map(note => ({
                ...note,
                value: Value.fromJSON(note.value),
              }))
            )
          );
        }
      }
    });
  }

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

  saveUserNotesToDB = (user, notesList) => {
    let docRef = this.db.collection(NOTES_COLLECTION).doc(user.email);
    docRef.set(JSON.parse(JSON.stringify({ notesList })), { merge: true });
  };

  getUserNotesFromDB = async user => {
    let docRef = this.db.collection(NOTES_COLLECTION).doc(user.email);
    try {
      let doc = await docRef.get();
      if (doc && doc.data() && doc.data().notesList) {
        return doc.data().notesList;
      }
    } catch (err) {
      console.error(err);
    }
  };
}

export default Firebase;
