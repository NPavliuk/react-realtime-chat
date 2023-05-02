import { db } from '@api/firebase'
import { doc, deleteDoc } from 'firebase/firestore'

export const removeUserConversation = async (userID, conversationID) => {
	const userConversationRef = doc(db, `users/${userID}/conversations`, conversationID)

	try {
		await deleteDoc(userConversationRef)
	} catch (error) {
		return error.message
	}
}
