export const filterConversations = (conversations, filters) => {
	const filtered = []
	const activeFilter = filters.filter(f => f.checked === true)[0]

	conversations.forEach(conversation => {
		switch (activeFilter.id) {
			case 'conversations-direct':
				if (conversation.directConversation) {
					filtered.push(conversation)
				}
				break
			case 'conversations-group':
				if (!conversation.directConversation) {
					filtered.push(conversation)
				}
				break
			default:
				filtered.push(conversation)
				break
		}
	})
	return filtered
}
