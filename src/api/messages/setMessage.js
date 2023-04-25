import { doc, setDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const setMessage = async (message, conversationID) => {
	const messagesRef = doc(db, `conversations/${conversationID}/messages`, message.id)

	try {
		await setDoc(messagesRef, message)
	} catch (error) {
		return error.message
	}
}
