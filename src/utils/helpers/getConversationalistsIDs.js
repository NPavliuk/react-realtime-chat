export const getConversationalistsIDs = (conversations, conversationID) => {
	const conversationalistsIDs = []

	conversations.map(conversation => {
		if (conversation.id === conversationID) {
			conversation.conversationalists.map(interlocutor => conversationalistsIDs.push(interlocutor.id))
		}
	})

	return conversationalistsIDs
}
