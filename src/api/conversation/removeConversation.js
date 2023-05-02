import { db } from '@api/firebase'
import { doc, deleteDoc } from 'firebase/firestore'

export const removeConversation = async (conversationID) => {
	const conversationRef = doc(db, `conversations`, conversationID)

	try {
		await deleteDoc(conversationRef)
	} catch (error) {
		return error.message
	}
}
