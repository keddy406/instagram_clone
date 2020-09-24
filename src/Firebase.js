import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCbjxxx2ukpYo7FTTl9FNSLQ6OsuPCdqyU",
  authDomain: "instagram-389cc.firebaseapp.com",
  databaseURL: "https://instagram-389cc.firebaseio.com",
  projectId: "instagram-389cc",
  storageBucket: "instagram-389cc.appspot.com",
  messagingSenderId: "384550787377",
  appId: "1:384550787377:web:b2a1d3bb1efd07b4c8b810",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
