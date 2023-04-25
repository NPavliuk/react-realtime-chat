import { doc, setDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const setConversation = async (userID, conversationID) => {
	const docRef = doc(db, `users/${userID}/conversations`, conversationID)

	try {
		return await setDoc(docRef, {})
	} catch (error) {
		return error.message
	}
}
