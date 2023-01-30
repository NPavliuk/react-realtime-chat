import { auth, db } from '@api/firebase'
import { setDoc, doc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export const signUpWithEmailPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(user => user.user)
    .catch(error => error.message)
}

export const setUserToDb = async (user) => {
  setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName
  })
}
