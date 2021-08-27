import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

// Firebase configuration
var firebaseConfig = {

    apiKey: "AIzaSyDlSQn7GTXYxw_6qEMMs1aMmuCxjv2E_Ic",
    authDomain: "remote-gate-keeper-test.firebaseapp.com",
    projectId: "remote-gate-keeper-test",
    storageBucket: "remote-gate-keeper-test.appspot.com",
    messagingSenderId: "344648733292",
    appId: "1:344648733292:web:480b7b1682bd5a75ae7e49"

};

const firebaseConfig2 = {

  apiKey: "AIzaSyB42TO1oKD-56k0IgYY08nAkVY5xhZaL1g",
  authDomain: "hardware-node-test.firebaseapp.com",
  databaseURL: "https://hardware-node-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hardware-node-test",
  storageBucket: "hardware-node-test.appspot.com",
  messagingSenderId: "815992512460",
  appId: "1:815992512460:web:befd581c462ec06d2d4769"

};

  // Initialize Firebase

const app  = firebase.initializeApp(firebaseConfig2);
export const db = app.database();
export const auth = app.auth();

export default app;