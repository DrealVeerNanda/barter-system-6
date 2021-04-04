import firebase from 'firebase';

require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyBr0EliDLDbhbqSo9tiH0JcvJgOtZ9rK_8",
    authDomain: "book-santa-c194a.firebaseapp.com",
    projectId: "book-santa-c194a",
    storageBucket: "book-santa-c194a.appspot.com",
    messagingSenderId: "271591314794",
    appId: "1:271591314794:web:d169660e32a25685014113"
  };
  
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();