import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDoc, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, updateDoc } from "firebase/firestore";

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

//queries for collection reference and orders by the time they were created
const q = query(colRef, orderBy('createdAt'))

// real time collection data
onSnapshot(q, (snapshot) => {
  let users = [];
  snapshot.docs.forEach((doc) => {
    users.push({ ...doc.data(), id: doc.id })
  })
  console.log(users);
});

// adding documents
const addUserForm = document.querySelector('.add')
addUserForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colRef, {
    username: addUserForm.username.value,
    game: addUserForm.game.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addUserForm.reset()
  })
})

// deleting documents
const deleteUserForm = document.querySelector('.delete')
deleteUserForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const docRef = doc(db, 'users', deleteUserForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteUserForm.reset()
    })
})

// get a single document
const docRef = doc(db, 'users', '9RvLON7w9Jh3bsCMK32U')

getDoc(docRef)
  .then((doc) => {
    console.log(doc.data(), doc.id)
  })

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'users', updateForm.id.value)

  updateDoc(docRef, {
    username: 'updated name',
  })
  .then(() => {
    updateForm.reset()
  })
})