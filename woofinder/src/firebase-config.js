
import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

export const firebaseConfig = {
    apiKey: "AIzaSyDi-nTvrEcCGTGoLWTXo0XnWRoQJObi-bs",
    authDomain: "woofinder-53a38.firebaseapp.com",
    projectId: "woofinder-53a38",
    storageBucket: "woofinder-53a38.appspot.com",
    messagingSenderId: "582591290081",
    appId: "1:582591290081:web:c739514fb91c4e997f75a0"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)