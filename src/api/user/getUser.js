import { doc, getDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const getUserData = async (uid) => {
  const docRef = doc(db, 'users', uid)

  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return 'No such document!'
  }
}
