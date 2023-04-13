import { db } from '@api/firebase'
import { collection, getDocs, query, where, documentId, onSnapshot } from 'firebase/firestore'

export const listenConversations = async (uid) => {
	let conversations = []
	const conversationsUIDs = []
	const conversationsDbRef = collection(db, 'conversations')
	const userConversationsDbRef = collection(db, `relations/${uid}/conversations`)

	const userConversationsData = await getDocs(userConversationsDbRef)
	userConversationsData.forEach((userConversation) => {
		conversationsUIDs.push(userConversation.id)
	})

	const conversationsData = query(conversationsDbRef, where(documentId(), 'in', conversationsUIDs))
	const unsub = onSnapshot(conversationsData, (querySnapshot) => {
		querySnapshot.forEach((doc) => {
			conversations.push(doc.data())
		})
	})

	// if (conversations.length > 0) {
	// 	await Promise.all(conversations.map(async (conversation) => {
	// 		conversation.conversationalists = await getUsers(conversation.conversationalists)
	// 	}))
	// }
	return conversations
}
