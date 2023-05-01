import { actionTypes } from '@constants/actionTypes'

export const watchConversationStart = (data) => ({
	type: actionTypes.WATCH_CONVERSATION_START,
	payload: data
})

export const watchConversationSuccess = (conversation) => ({
	type: actionTypes.WATCH_CONVERSATION_SUCCESS,
	payload: conversation
})

export const watchConversationFail = (error) => ({
	type: actionTypes.WATCH_CONVERSATION_FAIL,
	payload: error
})

export const chooseConversation = (id) => ({
	type: actionTypes.CHOOSE_CONVERSATION,
	payload: id
})

export const setConversationInput = (value) => ({
	type: actionTypes.SET_CONVERSATION_INPUT,
	payload: value
})
