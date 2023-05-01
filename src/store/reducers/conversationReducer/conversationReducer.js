import { actionTypes } from '@constants/actionTypes'

const initialState = {
	id: null,
	data: {},
	messageInput: '',
	loading: false,
	error: null
}

export const conversationReducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case actionTypes.CHOOSE_CONVERSATION:
			return {
				...state,
				id: payload
			}
		case actionTypes.WATCH_CONVERSATION_SUCCESS:
			return {
				...state,
				data: payload,
				loading: false
			}

		case actionTypes.WATCH_CONVERSATION_FAIL:
			return {
				...state,
				error: payload,
				loading: false
			}
		case actionTypes.SET_CONVERSATION_INPUT:
			return {
				...state,
				messageInput: payload
			}
		default:
			return state
	}
}
