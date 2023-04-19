export const isLastMessage = (messages, message) => {
	let isLastMessage
	messages.map((m, i) => m.id === message.id && i === messages.length - 1 ? isLastMessage = true : isLastMessage = false)
	return isLastMessage
}

export const getNewLastMessage = (messages) => {
	return messages[messages.length - 2]
}
