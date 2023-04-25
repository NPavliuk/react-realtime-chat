import { actionTypes } from '@constants/actionTypes'

export const openAddConversationModal = () => ({
	type: actionTypes.OPEN_ADD_CONVERSATION_MODAL
})

export const closeAddConversationModal = () => ({
	type: actionTypes.CLOSE_ADD_CONVERSATION_MODAL
})

export const setConversationFilter = (filterID) => ({
	type: actionTypes.SET_CONVERSATIONS_FILTER,
	payload: filterID
})

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

export const watchConversations = (conversations) => ({
	type: actionTypes.WATCH_CONVERSATIONS,
	payload: conversations
})

export const removeConversationsStart = (data) => ({
	type: actionTypes.REMOVE_CONVERSATION_START,
	payload: data
})

export const removeConversationsSuccess = () => ({
	type: actionTypes.REMOVE_CONVERSATION_SUCCESS
})

export const removeConversationsFail = (error) => ({
	type: actionTypes.REMOVE_CONVERSATION_FAIL,
	payload: error
})
