import { collection, getDocs } from 'firebase/firestore'
import { db } from '@api/firebase'

export const getAllUsers = async () => {
	const users = []

	try {
		const querySnapshot = await getDocs(collection(db, 'users'))
		querySnapshot.forEach((doc) => {
			users.push(doc.data())
		})
	} catch (error) {
		return error.message
	}

	return users
}
