import 'firebase/auth';
import 'firebase/firestore';
import app from 'firebase/app';
import config from './config';
import store from "../../store";
import { Value } from 'slate'
import { updateAuthStateAction, setSavedNotes } from "../../actions";

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

   signInPopup = async (provider) => {
    this.auth.signInWithPopup(provider)
  }

  signOut = () => {
    this.auth.signOut();
  }

  addUser = async (user) => {
      let dbuser = {
        name: user.displayName,
      };
      await this.db.collection("users").doc(user.email).set(dbuser);
  }

  setLoggedInState = (isLoggedIn) => {
    store.dispatch(updateAuthStateAction({
      loggedIn: isLoggedIn
    }));
  }

  setUserNotes = (user, notesList) => {
    let docRef = this.db.collection("notes").doc(user.email);
    docRef.set(JSON.parse(JSON.stringify({notesList})));
  }

  getUserNotes = (user) => {
    let docRef = this.db.collection("notes").doc(user.email);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        store.dispatch(setSavedNotes(doc.data().notesList
          .map(note => ({...note, value: Value.fromJSON(note.value)}))));
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }
}

export default Firebase;
