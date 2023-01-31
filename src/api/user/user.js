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

export const getUserData = async (uid) => {
  const docRef = doc(db, 'users', uid)

  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
   return 'No such document!'
  }
}
