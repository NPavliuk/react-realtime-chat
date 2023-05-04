export const getInterlocutorData = (conversation, message) => {
	if (conversation.data.conversationalists) {
		if (typeof message === 'string') {
			let interlocutor = conversation.data.conversationalists.filter(i => i.id !== message)
			return interlocutor[0]
		} else {
			let interlocutor = conversation.data.conversationalists.filter(i => i.id === message.senderId)
			return interlocutor[0]
		}
	}

	return null
}
