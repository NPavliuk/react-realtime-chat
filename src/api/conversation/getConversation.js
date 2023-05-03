import { doc, getDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const getConversation = async (conversationID) => {

	const conversationDocRef = doc(db, 'conversations', conversationID)

	try {
		const docSnap = await getDoc(conversationDocRef)

		if (docSnap.exists()) {
			return docSnap.data()
		} else {
			return 'No such document!'
		}
	} catch (error) {
		return error.message
	}
}
