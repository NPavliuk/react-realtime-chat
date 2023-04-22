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
		case actionTypes.GET_CONVERSATION_MESSAGES_START:
			return {
				...state,
				loading: true
			}
		case actionTypes.GET_CONVERSATION_MESSAGES_SUCCESS:
			return {
				...state,
				messages: payload,
				loading: false
			}
		case actionTypes.SET_CONVERSATION_MESSAGE_FAIL:
		case actionTypes.GET_CONVERSATION_MESSAGES_FAIL:
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
