import { ref } from "vue"

import { initializeApp } from "firebase/app"
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth"

const app = initializeApp({
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
})

const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence) //keep track of logged in user in the browser

const firebaseUser = ref<User | null>(auth.currentUser)

const login = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, rejects) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        firebaseUser.value = userCredential.user
        resolve(userCredential.user)
      })
      .catch(error => {
        rejects(error)
      })
  })
}

const register = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, rejects) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        firebaseUser.value = userCredential.user
        resolve(userCredential.user)
      })
      .catch(error => {
        rejects(error)
      })
  })
}

const restoreUser = async (): Promise<User | null> => {
  return new Promise(resolve => {
    onAuthStateChanged(auth, user => {
      if (user) {
        firebaseUser.value = user
        resolve(user)
      } else {
        firebaseUser.value = null
        resolve(null)
      }
    })
  })
}

export default () => {
  //state for each composable

  return {
    firebaseUser,
    login,
    restoreUser,
  }
}
