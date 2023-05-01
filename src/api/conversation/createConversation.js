import { doc, setDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const createConversation = async (conversation) => {
	const conversationDocRef = doc(db, 'conversations', conversation.id)

	try {
		await setDoc(conversationDocRef, conversation)
	} catch (error) {
		return error.message
	}
}
