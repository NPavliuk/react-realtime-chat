import { db } from '@api/firebase'
import { collection, getDocs, query, where, documentId } from 'firebase/firestore'
import { getUsers } from '@api/user/getUsers'

export const getConversations = async (uid) => {
	let conversations = []
	const conversationsUIDs = []
	const conversationsDbRef = collection(db, 'conversations')
	const userConversationsDbRef = collection(db, `relations/${uid}/conversations`)

	try {
		const userConversationsData = await getDocs(userConversationsDbRef)
		userConversationsData.forEach((userConversation) => {
			conversationsUIDs.push(userConversation.id)
		})

		if (conversationsUIDs.length > 0) {
			const conversationsData = query(conversationsDbRef, where(documentId(), 'in', conversationsUIDs))
			const querySnapshot = await getDocs(conversationsData)

			conversations = querySnapshot.docs.map(doc => doc.data())

			if (conversations.length > 0) {
				await Promise.all(conversations.map(async (conversation) => {
					conversation.conversationalists = await getUsers(conversation.conversationalists)
				}))
			}
		}
	} catch (error) {
		return error.message
	}

	return conversations
}
