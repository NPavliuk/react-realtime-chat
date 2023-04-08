import { collection, addDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const createMessages = async () => {
	const messagesDocRef = collection(db, 'messages')

	try {
		const messageDoc =  await addDoc(messagesDocRef, {})
		return messageDoc.id
	} catch (error) {
		return error.message
	}
}
