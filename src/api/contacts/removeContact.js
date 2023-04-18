import { db } from '@api/firebase'
import { doc, deleteDoc } from 'firebase/firestore'

export const removeContact = async (userID, contactID) => {
  const docRef = doc(db, `relations/${userID}/contacts`, contactID)

  try {
    await deleteDoc(docRef)
  } catch (error) {
    return error.message
  }
}
