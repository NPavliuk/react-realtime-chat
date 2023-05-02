import { collection, documentId, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@api/firebase'
import { getUsers } from '@api/users/getUsers'

export function watchConversations(eventChannel, userID) {
	return eventChannel((emit) => {
		let unsubConversations
		const conversationsRef = collection(db, 'conversations')
		const userConversationRef = collection(db, `users/${userID}/conversations`)

		const unsubUserConversations = onSnapshot(userConversationRef, {includeMetadataChanges: true}, (querySnapshot) => {
			let conversationsIDs = []

			querySnapshot.forEach((doc) => {
				conversationsIDs.push(doc.id)
			})

			if(conversationsIDs.length > 0) {
				const conversationsData = query(conversationsRef, where(documentId(), 'in', conversationsIDs))
				unsubConversations = onSnapshot(conversationsData, {includeMetadataChanges: true}, async (querySnapshot) => {
					let conversations = []

					querySnapshot.forEach((doc) => {
						const conversation = doc.data()
						conversations.push(conversation)
					})

					if (conversations.length > 0) {
						await Promise.all(conversations.map(async (conversation) => {
							conversation.conversationalists = await getUsers(conversation.conversationalists)
						}))
					}

					emit(conversations)
				})
			}
		})

		return () => {
			unsubConversations()
			unsubUserConversations()
		}
	})
}
