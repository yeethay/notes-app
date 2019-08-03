import config from './config';
import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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
        email: user.email
      };
      await this.db.collection("users").doc(user.email).set(dbuser);
  }
}

export default Firebase;
