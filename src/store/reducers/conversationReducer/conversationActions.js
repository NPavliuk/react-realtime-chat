import { actionTypes } from '@constants/actionTypes'

export const getConversationMessagesStart = (data) => ({
	type: actionTypes.GET_CONVERSATION_MESSAGES_START,
	payload: data
})

export const getConversationMessagesSuccess = (messages) => ({
	type: actionTypes.GET_CONVERSATION_MESSAGES_SUCCESS,
	payload: messages
})

export const getConversationMessagesFail = (error) => ({
	type: actionTypes.GET_CONVERSATION_MESSAGES_FAIL,
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


export const removeConversationMessageStart = (data) => ({
	type: actionTypes.REMOVE_CONVERSATION_MESSAGE_START,
	payload: data
})

export const removeConversationMessageSuccess = (messages) => ({
	type: actionTypes.REMOVE_CONVERSATION_MESSAGE_SUCCESS,
	payload: messages
})

export const removeConversationMessageFail = (error) => ({
	type: actionTypes.REMOVE_CONVERSATION_MESSAGE_FAIL,
	payload: error
})


export const chooseConversation = (id) => ({
	type: actionTypes.CHOOSE_CONVERSATION,
	payload: id
})
