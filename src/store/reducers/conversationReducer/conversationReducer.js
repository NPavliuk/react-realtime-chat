import { actionTypes } from '@constants/actionTypes'

const initialState = {
	id: null,
	data: {},
	messages: [],
	editMessage: {
		mode: false,
		message: null
	},
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
		case actionTypes.WATCH_CONVERSATION_SUCCESS:
			return {
				...state,
				data: payload,
				loading: false
			}
		case actionTypes.WATCH_CONVERSATION_MESSAGES_SUCCESS:
			return {
				...state,
				messages: payload,
				loading: false
			}
		case actionTypes.LIKE_CONVERSATION_MESSAGE_FAIL:
		case actionTypes.UNLIKE_CONVERSATION_MESSAGE_FAIL:
		case actionTypes.CLEAR_CONVERSATION_MESSAGES_FAIL:
		case actionTypes.WATCH_CONVERSATION_FAIL:
		case actionTypes.WATCH_CONVERSATION_MESSAGES_FAIL:
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
		case actionTypes.OPEN_EDIT_CONVERSATION_MESSAGE_MODE:
			return {
				...state,
				messageInput: payload.text,
				editMessage: {
					mode: true,
					message: payload
				}
			}
		case actionTypes.CLOSE_EDIT_CONVERSATION_MESSAGE_MODE:
		case actionTypes.EDIT_CONVERSATION_MESSAGE_SUCCESS:
			return {
				...state,
				messageInput: '',
				editMessage: {
					mode: false,
					message: null
				}
			}
		default:
			return state
	}
}
