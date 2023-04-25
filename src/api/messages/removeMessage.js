import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const removeMessage = async (message, conversationID) => {
	const messageRef = doc(db, `conversations/${conversationID}/messages`, message.id)

	try {
		await deleteDoc(messageRef)
	} catch (error) {
		return error.message
	}
}
