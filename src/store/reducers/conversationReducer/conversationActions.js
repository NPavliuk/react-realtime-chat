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

export const editConversationStart = (data) => ({
	type: actionTypes.EDIT_CONVERSATION_START,
	payload: data
})

export const editConversationSuccess = () => ({
	type: actionTypes.EDIT_CONVERSATION_SUCCESS
})

export const editConversationFail = (error) => ({
	type: actionTypes.EDIT_CONVERSATION_FAIL,
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

export const openAddInterlocutorModal = () => ({
	type: actionTypes.OPEN_ADD_INTERLOCUTOR_MODAL
})

export const closeAddInterlocutorModal = () => ({
	type: actionTypes.CLOSE_ADD_INTERLOCUTOR_MODAL
})

export const addInterlocutorStart = (data) => ({
	type: actionTypes.ADD_INTERLOCUTOR_START,
	payload: data
})

export const addInterlocutorSuccess = (data) => ({
	type: actionTypes.ADD_INTERLOCUTOR_SUCCESS,
	payload: data
})

export const addInterlocutorFail = (error) => ({
	type: actionTypes.ADD_INTERLOCUTOR_FAIL,
	payload: error
})

export const removeInterlocutorStart = (data) => ({
	type: actionTypes.REMOVE_INTERLOCUTOR_START,
	payload: data
})

export const removeInterlocutorSuccess = (data) => ({
	type: actionTypes.REMOVE_INTERLOCUTOR_SUCCESS,
	payload: data
})

export const removeInterlocutorFail = (error) => ({
	type: actionTypes.REMOVE_INTERLOCUTOR_FAIL,
	payload: error
})

export const openConversationBar = () => ({
	type: actionTypes.OPEN_CONVERSATION_BAR
})

export const closeConversationBar = () => ({
	type: actionTypes.CLOSE_CONVERSATION_BAR
})

export const openEditConversationModal = () => ({
	type: actionTypes.OPEN_EDIT_CONVERSATION_MODAL
})

export const closeEditConversationModal = () => ({
	type: actionTypes.CLOSE_EDIT_CONVERSATION_MODAL
})
