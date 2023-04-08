import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '@api/firebase'

export const createDirectConversation = async (conversationID, conversationalists) => {
	const conversationDocRef = doc(db, 'conversations', conversationID)

	const data = {
		directConversation: true,
		conversationalists: conversationalists,
		conversationStart: Timestamp.fromDate(new Date()),
		lastMessage: null
	}

	try {
		await setDoc(conversationDocRef, data)
	} catch (error) {
		return error.message
	}
}
