import config from './config';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import store from '../../store';
import { updateUserAction, updateUserNotesAction } from '../../actions';
import { Value } from 'slate';
import CryptoJS from 'crypto-js';

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
          let secret = user.uid;
          let decryptedNotesList = this.decryptNotesList(notesList, secret);
          notesList = Object.keys(decryptedNotesList).reduce((result, key) => {
            result[key] = decryptedNotesList[key];
            result[key].value = Value.fromJSON(decryptedNotesList[key].value);
            return result;
          }, {});
          store.dispatch(updateUserNotesAction(notesList));
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
    let secret = user.uid;
    let encryptedNotesList = this.encryptNotesList(notesList, secret);

    let docRef = this.db.collection(NOTES_COLLECTION).doc(user.email);
    docRef.set({ notesList: encryptedNotesList }, { merge: true });
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

  encryptNotesList(notesList, secret) {
    return Object.keys(notesList).reduce((result, key) => {
      result[key] = CryptoJS.AES.encrypt(
        JSON.stringify(notesList[key]),
        secret
      ).toString();
      return result;
    }, {});
  }

  decryptNotesList(notesList, secret) {
    return Object.keys(notesList).reduce((result, key) => {
      result[key] = JSON.parse(
        CryptoJS.AES.decrypt(notesList[key], secret).toString(CryptoJS.enc.Utf8)
      );
      return result;
    }, {});
  }
}

export default Firebase;
