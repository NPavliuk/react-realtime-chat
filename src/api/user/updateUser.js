import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const updateUserData = async (user) => {
  const docRef = doc(db, 'users', user.uid)
  await updateDoc(docRef, user)
}
