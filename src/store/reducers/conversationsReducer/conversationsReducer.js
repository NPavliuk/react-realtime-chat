import { actionTypes } from '@constants/actionTypes'

const initialState = {
	addModal: false,
	conversations: [],
	filters: [
		{id: 'conversations-all', name: 'conversations', title: 'All', checked: true},
		{id: 'conversations-direct', name: 'conversations', title: 'Direct', checked: false},
		{id: 'conversations-group', name: 'conversations', title: 'Group', checked: false}
	],
	loading: false,
	error: null
}

export const conversationsReducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case actionTypes.GET_CONVERSATIONS_START:
		case actionTypes.WATCH_CONVERSATIONS_START:
			return {
				...state,
				loading: true
			}
		case actionTypes.GET_CONVERSATIONS_SUCCESS:
		case actionTypes.WATCH_CONVERSATIONS_SUCCESS:
			return {
				...state,
				conversations: payload,
				loading: false
			}
		case actionTypes.WATCH_CONVERSATIONS_FAIL:
		case actionTypes.GET_CONVERSATIONS_FAIL:
			return {
				...state,
				error: payload,
				loading: false
			}
		case actionTypes.OPEN_ADD_CONVERSATION_MODAL:
			return {
				...state,
				addModal: true
			}
		case actionTypes.CLOSE_ADD_CONVERSATION_MODAL:
			return {
				...state,
				addModal: false
			}
		case actionTypes.SET_CONVERSATIONS_FILTER:
			const filters = []

			state.filters.forEach(filter => {
				filter.id === payload ? filter.checked = true : filter.checked = false
				filters.push(filter)
			})

			return {
				...state,
				filters: filters
			}
		default:
			return state
	}
}
