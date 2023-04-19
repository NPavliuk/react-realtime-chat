export const createSelectOptions = (users, userID) => {
	const selectOptions = []

	users.map(user => {
		if(user.id !== userID) {
			const selectOption = {
				label: user.name,
				value: user.id,
				user: user
			}

			selectOptions.push(selectOption)
		}
	})

	return selectOptions
}
