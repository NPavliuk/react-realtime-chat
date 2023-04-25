import { doc, getDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const getLastMessage = async (conversationID) => {
	const conversationRef = doc(db, 'conversations', conversationID)

	try {
		const conversationSnap = await getDoc(conversationRef)
		return conversationSnap.data().lastMessage
	} catch (error) {
		return error.message
	}
}
