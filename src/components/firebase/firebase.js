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
      // this.props.firebase.db.collection("users").add(dbuser);

  signOut = () => {
    this.auth.signOut();
  }

  isExistingUser = async (email) => {
    let results = await this.db.collection("users").where("email", "==", email).get();
    console.log(results.size)
    return results.size !== 0;
  }

  addUser = async (user) => {
      let dbuser = {
        name: user.displayName,
        email: user.email
      };
      await this.db.collection("users").add(dbuser);
  }
}

export default Firebase;
