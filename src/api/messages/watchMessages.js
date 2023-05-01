import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@api/firebase'

export function watchMessages(eventChannel, conversationID) {
	return eventChannel((emit) => {
		const messagesDbRef = collection(db, `conversations/${conversationID}/messages`)

		const unsubMessages = onSnapshot(messagesDbRef, {includeMetadataChanges: true}, snapshot => {
			let messages = []

			snapshot.forEach((doc) => {
				messages.push(doc.data())
			})

			emit(messages)
		})

		return () => unsubMessages
	})
}
