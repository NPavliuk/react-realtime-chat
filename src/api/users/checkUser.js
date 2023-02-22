import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@api/firebase'

export const checkUser = async (email) => {
  const users = []

  const q = query(collection(db, 'users'), where('email', '==', email))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    users.push(doc.id)
  })

  return users
}
