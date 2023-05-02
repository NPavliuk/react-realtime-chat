import { actionTypes } from '@constants/actionTypes'

export const createDirectConversationStart = (data) => ({
	type: actionTypes.CREATE_DIRECT_CONVERSATION_START,
	payload: data
})

export const createDirectConversationSuccess = (conversations) => ({
	type: actionTypes.CREATE_DIRECT_CONVERSATION_SUCCESS,
	payload: conversations
})

export const createDirectConversationFail = (error) => ({
	type: actionTypes.CREATE_DIRECT_CONVERSATION_FAIL,
	payload: error
})

export const createGroupConversationStart = (data) => ({
	type: actionTypes.CREATE_GROUP_CONVERSATION_START,
	payload: data
})

export const createGroupConversationSuccess = (conversations) => ({
	type: actionTypes.CREATE_GROUP_CONVERSATION_SUCCESS,
	payload: conversations
})

export const createGroupConversationFail = (error) => ({
	type: actionTypes.CREATE_GROUP_CONVERSATION_FAIL,
	payload: error
})

export const removeConversationStart = (data) => ({
	type: actionTypes.REMOVE_CONVERSATION_START,
	payload: data
})

export const removeConversationSuccess = () => ({
	type: actionTypes.REMOVE_CONVERSATION_SUCCESS
})

export const removeConversationFail = (error) => ({
	type: actionTypes.REMOVE_CONVERSATION_FAIL,
	payload: error
})


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
