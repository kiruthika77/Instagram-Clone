// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 // import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

  const firebaseApp =firebase.initializeApp({
    apiKey: "AIzaSyC61OAPti5fRxKKmVaNWv3K4vIM5fhQDL8",
    authDomain: "instagram-clone-react-da458.firebaseapp.com",
    projectId: "instagram-clone-react-da458",
    storageBucket: "instagram-clone-react-da458.appspot.com",
    messagingSenderId: "683126681499",
    appId: "1:683126681499:web:3e2bce1cf6c51c7245bb3e",
    measurementId: "G-ZDLHM4K2EN"
  });

  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();
  export{db,auth,storage};