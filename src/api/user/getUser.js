import { doc, getDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const getUserData = async (userID) => {
  const docRef = doc(db, 'users', userID)

	try {
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			return docSnap.data()
		} else {
			return 'No such document!'
		}
	} catch (error) {
		return error.message
	}
}
