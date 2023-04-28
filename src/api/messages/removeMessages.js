import { doc, deleteDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@api/firebase'

export const removeMessages = async ( conversationID) => {
	const messagesRef = collection(db, `conversations/${conversationID}/messages`)

	try {
		const querySnapshot = await getDocs(messagesRef)
		querySnapshot.forEach((doc) => {
			deleteDoc(doc.ref)
		})
	} catch (error) {
		return error.message
	}
}
