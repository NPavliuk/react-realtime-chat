import { doc, setDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const setUserToDb = async (userData) => {
	const userID = userData.uid
	const userRef = doc(db, 'users', userID)

	const user = {
		id: userID,
		email: userData.email,
		name: userData.name
	}

	try {
		await setDoc(userRef, user)
	} catch (error) {
		return error.message
	}
}
