import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const setUserToDb = async (user) => {
  const docRef = doc(db, 'users', user.uid)
  await setDoc(docRef, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName
  })
}
