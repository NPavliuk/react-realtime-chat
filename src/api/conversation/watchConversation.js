import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@api/firebase'

export function watchConversation(eventChannel, conversationID) {
	return eventChannel((emit) => {
		const conversationRef = doc(db, `conversations/${conversationID}`)

		const unsubConversation = onSnapshot(conversationRef, {includeMetadataChanges: true}, doc => {
			let conversation = {}

			if (doc.exists()) {
				conversation = doc.data()
			}

			emit(conversation)
		})

		return () => unsubConversation
	})
}
