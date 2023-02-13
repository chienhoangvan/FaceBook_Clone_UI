import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

export const firebaseConfig = {
  // apiKey: "AIzaSyBFlgqVXfxOTM7wpmXhsJ5_TQUPiIeb7w0",
  // authDomain: "otpphone-bc193.firebaseapp.com",
  // projectId: "otpphone-bc193",
  // storageBucket: "otpphone-bc193.appspot.com",
  // messagingSenderId: "880235671904",
  // appId: "1:880235671904:web:f6b1527fb5d26512baee05",
  // measurementId: "G-5B3E3NP2BP",

  apiKey: "AIzaSyDSY4lY72JI8oBRFQ0Gyl1xrq_-z0dxtHk",
  authDomain: "otpphonenumber-aaecd.firebaseapp.com",
  projectId: "otpphonenumber-aaecd",
  storageBucket: "otpphonenumber-aaecd.appspot.com",
  messagingSenderId: "788555336388",
  appId: "1:788555336388:web:e15b9b167be727e13cd791",
  measurementId: "G-5KY4H4M8WQ",

  // apiKey: "AIzaSyCnNr9Q3mmnccXnDTA48cqOq2hsyGUdWIY",
  // authDomain: "otpphone-ef3cb.firebaseapp.com",
  // projectId: "otpphone-ef3cb",
  // storageBucket: "otpphone-ef3cb.appspot.com",
  // messagingSenderId: "726438529257",
  // appId: "1:726438529257:web:b79dc02d4d33372ceb0878",
  // measurementId: "G-CBF8YP1MXG",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}