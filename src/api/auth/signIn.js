import { auth } from '@api/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const signInWithEmailPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(user => user.user)
    .catch(error => error.message)
}
