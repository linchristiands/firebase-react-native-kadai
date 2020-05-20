import firebase from 'firebase'
import 'firebase/functions';
require("firebase/firestore");


const config = {
    apiKey: "AIzaSyCPPUto1TtS74ALvfb6UGHNK0AYDXG-QGI",
    authDomain: "fir-react-kadai.firebaseapp.com",
    databaseURL: "https://fir-react-kadai.firebaseio.com",
    projectId: "fir-react-kadai",
    storageBucket: "fir-react-kadai.appspot.com",
    messagingSenderId: "7538340630",
    appId: "1:7538340630:web:c550321c0f97820ec35637"
  };
// Initialize Firebase
firebase.initializeApp(config);

export const app = firebase.app();
export const functions = firebase.functions();
export default firebase;

