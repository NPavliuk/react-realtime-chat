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

export const watchConversationsStart = (id) => ({
	type: actionTypes.WATCH_CONVERSATIONS_START,
	payload: id
})

export const watchConversationsSuccess = (conversations) => ({
	type: actionTypes.WATCH_CONVERSATIONS_SUCCESS,
	payload: conversations
})

export const watchConversationsFail = (error) => ({
	type: actionTypes.WATCH_CONVERSATIONS_FAIL,
	payload: error
})

export const watchConversationsCancel = () => ({
	type: actionTypes.WATCH_CONVERSATIONS_CANCEL,
})

export const watchConversationsRestart = (id) => ({
	type: actionTypes.WATCH_CONVERSATIONS_RESTART,
	payload: id
})
