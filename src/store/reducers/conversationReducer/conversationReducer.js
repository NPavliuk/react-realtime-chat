import { actionTypes } from '@constants/actionTypes'

const initialState = {
	id: null,
	messages: [],
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
		case actionTypes.SET_CONVERSATION_MESSAGE_START:
			return {
				...state,
				loading: true
			}
		case actionTypes.WATCH_CONVERSATION_MESSAGES:
			return {
				...state,
				messages: payload,
				loading: false
			}
		case actionTypes.SET_CONVERSATION_MESSAGE_FAIL:
		case actionTypes.SET_READED_CONVERSATION_MESSAGE_FAIL:
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
