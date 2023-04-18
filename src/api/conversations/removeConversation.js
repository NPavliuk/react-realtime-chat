import { db } from '@api/firebase'
import { doc, deleteDoc } from 'firebase/firestore'

export const removeConversation = async (userID, interlocutorID, conversationID) => {
	const messagesRef = doc(db, `messages`, conversationID)
	const conversationRef = doc(db, 'conversations', conversationID)
	const userConversationRef = doc(db, `relations/${userID}/conversations`, conversationID)

	try {
		await deleteDoc(messagesRef)
		await deleteDoc(conversationRef)
		await deleteDoc(userConversationRef)
	} catch (error) {
		return error.message
	}
}
