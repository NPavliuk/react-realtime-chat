import { db } from '@api/firebase'
import { collection, getDocs, query, where, documentId } from 'firebase/firestore'
import { getUsers } from '@api/users/getUsers'

export const getConversations = async (userID) => {
	let conversations = []
	const conversationsIDs = []
	const conversationsDbRef = collection(db, 'conversations')
	const userConversationsDbRef = collection(db, `relations/${userID}/conversations`)

	try {
		const userConversationsData = await getDocs(userConversationsDbRef)
		userConversationsData.forEach((userConversation) => {
			conversationsIDs.push(userConversation.id)
		})

		if (conversationsIDs.length > 0) {
			const conversationsData = query(conversationsDbRef, where(documentId(), 'in', conversationsIDs))
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
