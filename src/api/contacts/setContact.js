import { db } from '@api/firebase'
import { doc, setDoc } from 'firebase/firestore'

export const setContact = async (userID, contactID) => {
  const docRef = doc(db, `relations/${userID}/contacts`, contactID)

  try {
    await setDoc(docRef, {})
  } catch (error) {
    return error.message
  }
}
