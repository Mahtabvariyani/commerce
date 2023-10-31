// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyRRNRYSFPkbvkiJI7m-QEwMO3516nkxU",
  authDomain: "commerceshopmah.firebaseapp.com",
  projectId: "commerceshopmah",
  storageBucket: "commerceshopmah.appspot.com",
  messagingSenderId: "763400206401",
  appId: "1:763400206401:web:428e2cdb3674ea598b2ec0",
  measurementId: "G-MFGQRDWDV0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp
