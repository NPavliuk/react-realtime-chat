import { db } from '@api/firebase'
import { doc, deleteDoc } from 'firebase/firestore'

export const removeContact = async (currentUID, contactUID) => {
  const docRef = doc(db, `relations/${currentUID}/contacts`, contactUID)

  try {
    await deleteDoc(docRef)
  } catch (error) {
    return error.message
  }
}
