import { auth } from '@api/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export const signUpWithEmailPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(user => user.user)
    .catch(error => error.message)
}
