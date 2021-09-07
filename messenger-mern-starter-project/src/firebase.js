import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBQjhl6nqsYe3T_faAySno3vgN3Qtfs4to",
  authDomain: "messenger-react-e9b79.firebaseapp.com",
  projectId: "messenger-react-e9b79",
  storageBucket: "messenger-react-e9b79.appspot.com",
  messagingSenderId: "860963084223",
  appId: "1:860963084223:web:194140e20a831fd789730a",
  measurementId: "G-XMTL3QEMQP",
});

const db = firebaseApp.firestore();

export default db;
