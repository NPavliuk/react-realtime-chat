import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const setConversationInterlocutor = async (conversationalists, conversationID) => {
	const docRef = doc(db, `conversations`, conversationID)

	try {
		 await updateDoc(docRef, {
			 conversationalists: conversationalists
		 })
	} catch (error) {
		return error.message
	}
}
