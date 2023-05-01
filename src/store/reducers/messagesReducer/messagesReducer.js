import { actionTypes } from '@constants/actionTypes'

const initialState = {
	messages: [],
	editMessage: {
		mode: false,
		message: null
	},
	replyMessage: {
		mode: false,
		message: null
	},
	loading: false,
	error: null
}

export const messagesReducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case actionTypes.WATCH_MESSAGES_SUCCESS:
			return {
				...state,
				messages: payload,
				loading: false
			}
		case actionTypes.OPEN_EDIT_MESSAGE_MODE:
			return {
				...state,
				editMessage: {
					mode: true,
					message: payload
				}
			}
		case actionTypes.OPEN_REPLY_MESSAGE_MODE:
			return {
				...state,
				replyMessage: {
					mode: true,
					message: payload
				}
			}
		case actionTypes.CLOSE_REPLY_MESSAGE_MODE:
		case actionTypes.CLOSE_EDIT_MESSAGE_MODE:
		case actionTypes.EDIT_MESSAGE_SUCCESS:
			return {
				...state,
				editMessage: {
					mode: false,
					message: null
				},
				replyMessage: {
					mode: false,
					message: null
				}
			}
		case actionTypes.LIKE_MESSAGE_FAIL:
		case actionTypes.UNLIKE_MESSAGE_FAIL:
		case actionTypes.WATCH_MESSAGES_FAIL:
		case actionTypes.SET_MESSAGE_FAIL:
		case actionTypes.SET_READED_MESSAGE_FAIL:
			return {
				...state,
				error: payload,
				loading: false
			}
		default:
			return state
	}
}
