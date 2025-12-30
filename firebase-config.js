// firebase-config.js - Firebase configuration for KalOPS project
// Make sure this file is included BEFORE any form handling scripts

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFUz5n_kKWYqkQVvOUAyJHeweF_X0Y-Xk",
    authDomain: "kalops-fc1a0.firebaseapp.com",
    projectId: "kalops-fc1a0",
    storageBucket: "kalops-fc1a0.firebasestorage.app",
    messagingSenderId: "1062665885694",
    appId: "1:1062665885694:web:68c632d1747e3b56c812af",
    measurementId: "G-H77HP6YH1S"
};

// Initialize Firebase only if not already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Initialize Firestore database
const db = firebase.firestore();

// Enable offline persistence (optional)
db.enablePersistence()
  .catch((err) => {
      console.log("Firebase persistence error: ", err.code);
  });

console.log("Firebase initialized successfully!");
