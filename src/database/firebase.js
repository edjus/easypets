import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC5OyerFXoMoaRz0wxp8VkQTBs8UUbdQJk",
  authDomain: "easypet-428a4.firebaseapp.com",
  projectId: "easypet-428a4",
  storageBucket: "easypet-428a4.appspot.com",
  messagingSenderId: "420670457260",
  appId: "1:420670457260:web:0d93fdf69fad880a8e6609",
  measurementId: "G-7GX655W42T"
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);


  const storage = firebase.storage()

  export  {
    storage, firebase as default
  }