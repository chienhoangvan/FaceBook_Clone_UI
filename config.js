import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBFlgqVXfxOTM7wpmXhsJ5_TQUPiIeb7w0",
  authDomain: "otpphone-bc193.firebaseapp.com",
  projectId: "otpphone-bc193",
  storageBucket: "otpphone-bc193.appspot.com",
  messagingSenderId: "880235671904",
  appId: "1:880235671904:web:f6b1527fb5d26512baee05",
  measurementId: "G-5B3E3NP2BP",
};

// export const firebaseConfigImage = {
//   apiKey: "AIzaSyBqwEUK3QUy3rPZy07SfqdVfupfXASLBK0",
//   authDomain: "images-16563.firebaseapp.com",
//   projectId: "images-16563",
//   storageBucket: "images-16563.appspot.com",
//   messagingSenderId: "126635534277",
//   appId: "1:126635534277:web:0c275181ade06bfc694dac",
//   measurementId: "G-NNLVS0YB0S",
// };
// firebase.initializeApp(firebaseConfigImage) ||
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
