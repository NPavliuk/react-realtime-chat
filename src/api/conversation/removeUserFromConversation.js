import { db } from '@api/firebase'
import { doc, updateDoc, arrayRemove } from 'firebase/firestore'

export const removeUserFromConversation = async (userID, conversationID) => {
	const conversationRef = doc(db, `conversations`, conversationID)

	try {
		await updateDoc(conversationRef, {
			conversationalists: arrayRemove(userID)
		})
	} catch (error) {
		return error.message
	}
}
