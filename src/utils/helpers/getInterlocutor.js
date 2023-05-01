export const getInterlocutor = (conversation, message) => {
	if (conversation.data.conversationalists) {
		let interlocutor = conversation.data.conversationalists.filter(i => i.id === message.senderId)
		return interlocutor[0]
	}

	return null
}
