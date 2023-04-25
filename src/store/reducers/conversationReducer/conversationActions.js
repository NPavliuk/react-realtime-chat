import { actionTypes } from '@constants/actionTypes'

export const watchConversationMessages = (messages) => ({
	type: actionTypes.WATCH_CONVERSATION_MESSAGES,
	payload: messages
})

export const setConversationMessageStart = (data) => ({
	type: actionTypes.SET_CONVERSATION_MESSAGE_START,
	payload: data
})

export const setConversationMessageSuccess = (messages) => ({
	type: actionTypes.SET_CONVERSATION_MESSAGE_SUCCESS,
	payload: messages
})

export const setConversationMessageFail = (error) => ({
	type: actionTypes.SET_CONVERSATION_MESSAGE_FAIL,
	payload: error
})

export const removeConversationMessageStart = (data) => ({
	type: actionTypes.REMOVE_CONVERSATION_MESSAGE_START,
	payload: data
})

export const removeConversationMessageSuccess = () => ({
	type: actionTypes.REMOVE_CONVERSATION_MESSAGE_SUCCESS,
})

export const removeConversationMessageFail = (error) => ({
	type: actionTypes.REMOVE_CONVERSATION_MESSAGE_FAIL,
	payload: error
})

export const setReadedConversationMessageStart = (data) => ({
	type: actionTypes.SET_READED_CONVERSATION_MESSAGE_START,
	payload: data
})

export const setReadedConversationMessageSuccess = () => ({
	type: actionTypes.SET_READED_CONVERSATION_MESSAGE_SUCCESS,
})

export const setReadedConversationMessageFail = (error) => ({
	type: actionTypes.SET_READED_CONVERSATION_MESSAGE_FAIL,
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
