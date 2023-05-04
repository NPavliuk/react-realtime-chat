export const checkUserStatus = (userId, users) => {
	return users.filter(user => user.id === userId && user.state === 'online').length > 0
}
