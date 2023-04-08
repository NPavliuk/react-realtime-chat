import { collection, query, where, getDocs, documentId } from 'firebase/firestore'
import { db } from '@api/firebase'

export const checkConversation = async (currentUID, interlocutorUID) => {
	const conversationsUIDs = []
	const userConversationsDbRef = collection(db, `relations/${currentUID}/conversations`)

	try {
		const userConversationsData = await getDocs(userConversationsDbRef)
		userConversationsData.forEach((userConversation) => {
			conversationsUIDs.push(userConversation.id)
		})

		if (conversationsUIDs.length > 0) {
			const conversations = []
			const isConversationExist = where(documentId(), 'in', conversationsUIDs)
			const isConversationContainUser = where('conversationalists', 'array-contains', interlocutorUID)
			const isDirectConversation = where('directConversation', '==', true)

			const q = query(collection(db, 'conversations'), isConversationExist, isConversationContainUser, isDirectConversation)
			const querySnapshot = await getDocs(q)
			querySnapshot.forEach((doc) => {
				conversations.push(doc.id)
			})

			return conversations.length > 0
		}
	} catch (error) {
		return error.message
	}
}
