import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL9FckSYL0lCQ6sM5fW2kQL7SLI0zpHfg",
  authDomain: "just-play-ec9eb.firebaseapp.com",
  projectId: "just-play-ec9eb",
  storageBucket: "just-play-ec9eb.appspot.com",
  messagingSenderId: "54544685025",
  appId: "1:54544685025:web:4b2573ffbd224d8a78e4a0",
  measurementId: "G-Z7DVDGRXLQ",
};

// init firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "users");

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let users = [];
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id })
  })
  console.log(users);
});

// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
})