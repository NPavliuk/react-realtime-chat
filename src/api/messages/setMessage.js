import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '@api/firebase'

export const setMessage = async (message, conversationID) => {
	const docRef = doc(db, 'messages', conversationID)

	try {
		await updateDoc(docRef, {messages: arrayUnion(message)})
	} catch (error) {
		return error.message
	}
}
