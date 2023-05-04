export const sortConversations = (conversations) => {
	return conversations.sort((a, b) => {
		const dateA = a.lastMessage ? a.lastMessage.date : a.conversationStart
		const dateB = b.lastMessage ? b.lastMessage.date : b.conversationStart
		return new Date(dateB.seconds*1000) - new Date(dateA.seconds*1000)
	})
}
