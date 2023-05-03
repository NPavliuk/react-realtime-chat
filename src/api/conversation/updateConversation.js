import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const updateConversation = async (conversation) => {
	const conversationRef = doc(db, 'conversations', conversation.id)

	try {
		await updateDoc(conversationRef, conversation)
	} catch (error) {
		return error.message
	}
}
