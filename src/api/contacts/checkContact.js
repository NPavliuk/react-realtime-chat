import { doc, getDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const checkContact = async (currentUID, contactUID) => {
  const docRef = doc(db, `relations/${currentUID}/contacts`, contactUID)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return true
  } else {
    return false
  }
}
