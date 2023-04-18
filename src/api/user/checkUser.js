import { collection, query, where, getDocs, updateDoc, arrayRemove } from 'firebase/firestore'
import { db } from '@api/firebase'

export const checkUser = async (email) => {
  const users = []
	const q = query(collection(db, 'users'), where('email', '==', email))

	try {
		const querySnapshot = await getDocs(q)
		querySnapshot.forEach((doc) => {
			users.push(doc.id)
		})
	} catch (error) {
		return error.message
	}

  return users
}
