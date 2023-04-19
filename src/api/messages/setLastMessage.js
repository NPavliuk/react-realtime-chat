import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const setLastMessage = async (message, conversationID) => {
	const conversationRef = doc(db, 'conversations', conversationID)

	try {
		await updateDoc(conversationRef, {
			lastMessage: message
		})
	} catch (error) {
		return error.message
	}
}
