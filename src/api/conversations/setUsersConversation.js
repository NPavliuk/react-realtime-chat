import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const setUsersConversation = async (userID, conversationalists, conversationID) => {

	conversationalists.map(async interlocutorID => {
		if (interlocutorID !== userID) {
			const docRef = doc(db, `relations/${interlocutorID}/conversations`, conversationID)

			try {
				const docSnap = await getDoc(docRef)
				if (!docSnap.exists()) {
					await setDoc(docRef, {})
				}
			} catch (error) {
				return error.message
			}
		}
	})
}
