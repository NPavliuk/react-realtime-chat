import { doc, getDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const checkContact = async (uid, cid) => {
  const docRef = doc(db, `relations/${uid}/contacts`, cid)
  const docSnap = await getDoc(docRef)

  return docSnap.exists()
}
