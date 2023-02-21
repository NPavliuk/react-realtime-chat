import { collection, getDocs } from 'firebase/firestore'
import { db } from '@api/firebase'

export const getUsers = async () => {
  const users = []

  const querySnapshot = await getDocs(collection(db, 'users'))
  querySnapshot.forEach((doc) => {
    users.push(doc.data())
  })

  return users
}
