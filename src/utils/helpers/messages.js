export const isLastMessage = (messages, message) => {
	let isLastMessage
	messages.map((m, i) => m.id === message.id && i === messages.length - 1 ? isLastMessage = true : isLastMessage = false)
	return isLastMessage
}

export const getNewLastMessage = (messages) => {
	return messages[messages.length - 2]
}

export const isUnreadMessage = (message, userID) => {
	if (message && message.readers) {
		const readers = message.readers.filter(reader => reader === userID)
		return readers.length === 0
	}
	return false
}

export const isUnreadConversations = (conversations, userID) => {
	let unreadConversation = []

	if (conversations) {
		conversations.map(conversation => {
			if (conversation.lastMessage) {
				const readers = conversation.lastMessage.readers.filter(reader => reader === userID)
				if (readers.length === 0) {
					unreadConversation.push(conversation)
				}
			}
		})
	}

	return unreadConversation.length > 0
}
