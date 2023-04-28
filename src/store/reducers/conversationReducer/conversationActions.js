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

export const watchConversationMessagesStart = (id) => ({
	type: actionTypes.WATCH_CONVERSATION_MESSAGES_START,
	payload: id
})

export const watchConversationMessagesSuccess = (messages) => ({
	type: actionTypes.WATCH_CONVERSATION_MESSAGES_SUCCESS,
	payload: messages
})

export const watchConversationMessagesFail = (error) => ({
	type: actionTypes.WATCH_CONVERSATION_MESSAGES_FAIL,
	payload: error
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

export const clearConversationMessagesStart = (id) => ({
	type: actionTypes.CLEAR_CONVERSATION_MESSAGES_START,
	payload: id
})

export const clearConversationMessagesSuccess = () => ({
	type: actionTypes.CLEAR_CONVERSATION_MESSAGES_SUCCESS,
})

export const clearConversationMessagesFail = (error) => ({
	type: actionTypes.CLEAR_CONVERSATION_MESSAGES_FAIL,
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
