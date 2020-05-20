import firebase from 'firebase'
import 'firebase/functions';
require("firebase/firestore");


const config = {};
// Initialize Firebase
firebase.initializeApp(config);

export const app = firebase.app();
export const functions = firebase.functions();
export default firebase;

