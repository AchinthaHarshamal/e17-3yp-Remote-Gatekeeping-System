import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'




const firebaseConfig = {
  apiKey: "AIzaSyA2lgAuXNJGVoeg_QVf7wXb4oRVH3lXyic",
  authDomain: "gate-keeper-6fad9.firebaseapp.com",
  databaseURL: "https://gate-keeper-6fad9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gate-keeper-6fad9",
  storageBucket: "gate-keeper-6fad9.appspot.com",
  messagingSenderId: "3341189942",
  appId: "1:3341189942:web:638f5f48ba86f9a7b36997"
};


// Initialize Firebase
const app  = firebase.initializeApp(firebaseConfig);

export const db = app.database();
export const auth = app.auth();
export const storage = app.storage()


export default app;