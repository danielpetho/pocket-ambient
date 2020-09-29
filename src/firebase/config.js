import * as firebase from 'firebase/app';

import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDsQ10tYvUDc_bXWTTY6QXehAQ_vV21L4k",
    authDomain: "pocket-ambient.firebaseapp.com",
    databaseURL: "https://pocket-ambient.firebaseio.com",
    projectId: "pocket-ambient",
    storageBucket: "pocket-ambient.appspot.com",
    messagingSenderId: "612140985660",
    appId: "1:612140985660:web:743b86c09911722dc04239"
}

firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();

export { projectStorage };
