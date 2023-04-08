import { doc, setDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const setConversation = async (currentUID, conversationID) => {
	const docRef = doc(db, `relations/${currentUID}/conversations`, conversationID)

	try {
		return await setDoc(docRef, {})
	} catch (error) {
		return error.message
	}
}
