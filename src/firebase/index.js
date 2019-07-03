import firebaseConfig from "./config";
import * as firebase from "firebase/app";
import "firebase/auth";

let fb = firebase.initializeApp(firebaseConfig);
let auth = fb.auth();

export { auth };
