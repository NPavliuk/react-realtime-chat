import { doc, updateDoc, arrayRemove } from 'firebase/firestore'
import { db } from '@api/firebase'

export const removeMessage = async (message, conversationID) => {
	const docRef = doc(db, 'messages', conversationID)

	try {
		await updateDoc(docRef, {messages: arrayRemove(message)})
	} catch (error) {
		return error.message
	}
}
