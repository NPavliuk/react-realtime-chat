import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@api/firebase'

export function watchConversation(eventChannel, conversationID) {
	return eventChannel((emmiter) => {
		const conversationRef = doc(db, `conversations/${conversationID}`)

		const unsubConversation = onSnapshot(conversationRef, {includeMetadataChanges: true}, doc => {
			const conversation = doc.data()

			emmiter(conversation)
		})

		return () => unsubConversation
	})
}
