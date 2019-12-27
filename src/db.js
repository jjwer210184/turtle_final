import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize your firebase app
const firebaseConfig = {
    apiKey: "AIzaSyD7NzSzukDv9yuhj2ePNAdu5RwybG9G0uo",
    authDomain: "test-5738a.firebaseapp.com",
    databaseURL: "https://test-5738a.firebaseio.com",
    projectId: "test-5738a",
    storageBucket: "test-5738a.appspot.com",
    messagingSenderId: "433104755254",
    appId: "1:433104755254:web:8bb2117cdd5a9feda15697",
    measurementId: "G-R58D8LMBCX"
  };
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()