import moment from 'moment/moment'

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

export const groupedDays = (messages) => {
	return messages.reduce((acc, el) => {
		const messageDay = moment(el.date.seconds * 1000).format('YYYY-MM-DD')
		if (acc[messageDay]) {
			return {...acc, [messageDay]: acc[messageDay].concat([el])}
		}
		return {...acc, [messageDay]: [el]}
	}, {})
}

export const generateMessages = (messages) => {
	const days = groupedDays(messages)
	const sortedDays = Object.keys(days).sort(
		(x, y) => moment(y, 'YYYY-MM-DD').unix() - moment(x, 'YYYY-MM-DD').unix()
	)

	const items = sortedDays.reduce((acc, date) => {
		const sortedMessages = days[date].sort(
			(x, y) => new Date(y.date.seconds * 1000) - new Date(x.date.seconds * 1000)
		)
		return acc.concat([...sortedMessages, {type: 'day', date, id: date}])
	}, [])
	return items.reverse()
}
