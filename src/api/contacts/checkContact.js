import { doc, getDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const checkContact = async (uid, cid) => {
  const docRef = doc(db, `relations/${uid}/contacts`, cid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return true
  } else {
    return false
  }
}
