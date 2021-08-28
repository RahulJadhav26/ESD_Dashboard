// Initialize Firebase
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDUHlJhbXL1jj8PArqermW3gfJf9tqTY1w',
  authDomain: 'cent-6d778.firebaseapp.com',
  projectId: 'cent-6d778',
  storageBucket: 'cent-6d778.appspot.com',
  messagingSenderId: '783338925951',
  appId: '1:783338925951:web:cb35fde1f6c9eed7bff44a',
  measurementId: 'G-NP5DN98CXZ'
}

const app = firebase.initializeApp(firebaseConfig)

export const db = app.database()
export const dataRef = db.ref('data')
