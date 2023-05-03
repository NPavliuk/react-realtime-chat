export const createSelectOptions = (users, conversationalists) => {
	return users.filter(user => !conversationalists.includes(user.id)).map(user => user = {
		label: user.name,
		value: user.id,
		user: user
	})
}
