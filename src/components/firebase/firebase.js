import config from './config';
import app from 'firebase/app';
import 'firebase/auth';

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  signInPopup = provider => {
    this.auth.signInWithPopup(provider);
  };

  signOut = () => {
    this.auth.signOut();
  };
}

export default Firebase;
