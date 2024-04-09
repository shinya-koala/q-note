import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  // TODO: Use env.
  apiKey: "AIzaSyC4VrOV2ZtJrjY5TWEqDO4AXKRI-HalrZE",
  authDomain: "q-note-1b9ef.firebaseapp.com",
  projectId: "q-note-1b9ef",
  storageBucket: "q-note-1b9ef.appspot.com",
  messagingSenderId: "451437049895",
  appId: "1:451437049895:web:71a85a2d90c5f66f663602",
});

export const db = firebaseApp.firestore();

export const auth = firebase.auth();
