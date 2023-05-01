import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const updateMessage = async (message, conversationID) => {
	const messagesRef = doc(db, `conversations/${conversationID}/messages`, message.id)

	try {
		await updateDoc(messagesRef, message)
	} catch (error) {
		return error.message
	}
}
