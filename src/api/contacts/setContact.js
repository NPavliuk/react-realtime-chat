import { db } from '@api/firebase'
import { doc, setDoc } from 'firebase/firestore'

export const setContact = async (currentUID, contactUID) => {
  const docRef = doc(db, `relations/${currentUID}/contacts`, contactUID)

  try {
    await setDoc(docRef, {})
  } catch (error) {
    return error.message
  }
}
