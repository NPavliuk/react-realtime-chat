import { collection, query, where, getDocs, documentId } from 'firebase/firestore'
import { db } from '@api/firebase'

export const checkConversation = async (currentID, interlocutorID) => {
	const conversationsIDs = []
	const userConversationsDbRef = collection(db, `relations/${currentID}/conversations`)

	try {
		const userConversationsData = await getDocs(userConversationsDbRef)
		userConversationsData.forEach((userConversation) => {
			conversationsIDs.push(userConversation.id)
		})

		if (conversationsIDs.length > 0) {
			const conversations = []
			const isConversationExist = where(documentId(), 'in', conversationsIDs)
			const isConversationContainUser = where('conversationalists', 'array-contains', interlocutorID)
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
