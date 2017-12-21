import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAdgBxejCRIrRE34hKqkG6m_2GplJmCUNw",
  authDomain: "eecs6893-movie-data.firebaseapp.com",
  databaseURL: "https://eecs6893-movie-data.firebaseio.com",
  projectId: "eecs6893-movie-data",
  storageBucket: "eecs6893-movie-data.appspot.com",
  messagingSenderId: "865566125522"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const db = firebase.database();
export const ref = firebase.database().ref();
export const st = firebase.storage();
export const storageRef = firebase.storage().ref();
export const firebaseAuth = firebase.auth;
