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

export const getAllConversationsStart = (uid) => ({
	type: actionTypes.GET_ALL_CONVERSATIONS_START,
	payload: uid
})

export const getAllConversationsSuccess = (conversations) => ({
	type: actionTypes.GET_ALL_CONVERSATIONS_SUCCESS,
	payload: conversations
})

export const getAllConversationsFail = (error) => ({
	type: actionTypes.GET_ALL_CONVERSATIONS_FAIL,
	payload: error
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
