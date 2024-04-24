// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0fl6_YG2lNqRwO4zJgsnJ8WQu3Spmk-w",
  authDomain: "skill-share-client-45a2a.firebaseapp.com",
  projectId: "skill-share-client-45a2a",
  storageBucket: "skill-share-client-45a2a.appspot.com",
  messagingSenderId: "1009726432259",
  appId: "1:1009726432259:web:fbcfe8d17a448a4d1c9a36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;