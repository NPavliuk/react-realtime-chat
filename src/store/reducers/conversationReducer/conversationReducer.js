import { actionTypes } from '@constants/actionTypes'

const initialState = {
	id: null,
	data: {},
	sidebar: false,
	addModal: false,
	editModal: false,
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
		case actionTypes.EDIT_CONVERSATION_FAIL:
		case actionTypes.ADD_INTERLOCUTOR_FAIL:
		case actionTypes.REMOVE_INTERLOCUTOR_FAIL:
		case actionTypes.REMOVE_CONVERSATION_FAIL:
		case actionTypes.CREATE_GROUP_CONVERSATION_FAIL:
		case actionTypes.CREATE_DIRECT_CONVERSATION_FAIL:
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
		case actionTypes.OPEN_ADD_INTERLOCUTOR_MODAL:
			return {
				...state,
				addModal: true
			}
		case actionTypes.CLOSE_ADD_INTERLOCUTOR_MODAL:
			return {
				...state,
				addModal: false
			}
		case actionTypes.OPEN_CONVERSATION_BAR:
			return {
				...state,
				sidebar: true
			}
		case actionTypes.CLOSE_CONVERSATION_BAR:
			return {
				...state,
				sidebar: false
			}
		case actionTypes.OPEN_EDIT_CONVERSATION_MODAL:
			return {
				...state,
				editModal: true
			}
		case actionTypes.CLOSE_EDIT_CONVERSATION_MODAL:
			return {
				...state,
				editModal: false
			}
		default:
			return state
	}
}
