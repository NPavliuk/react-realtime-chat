import { actionTypes } from '@constants/actionTypes'

export const watchMessagesStart = (id) => ({
	type: actionTypes.WATCH_MESSAGES_START,
	payload: id
})

export const watchMessagesSuccess = (messages) => ({
	type: actionTypes.WATCH_MESSAGES_SUCCESS,
	payload: messages
})

export const watchMessagesFail = (error) => ({
	type: actionTypes.WATCH_MESSAGES_FAIL,
	payload: error
})

export const setMessageStart = (data) => ({
	type: actionTypes.SET_MESSAGE_START,
	payload: data
})

export const setMessageSuccess = (messages) => ({
	type: actionTypes.SET_MESSAGE_SUCCESS,
	payload: messages
})

export const setMessageFail = (error) => ({
	type: actionTypes.SET_MESSAGE_FAIL,
	payload: error
})

export const clearMessagesStart = (id) => ({
	type: actionTypes.CLEAR_MESSAGES_START,
	payload: id
})

export const clearMessagesSuccess = () => ({
	type: actionTypes.CLEAR_MESSAGES_SUCCESS,
})

export const clearMessagesFail = (error) => ({
	type: actionTypes.CLEAR_MESSAGES_FAIL,
	payload: error
})

export const removeMessageStart = (data) => ({
	type: actionTypes.REMOVE_MESSAGE_START,
	payload: data
})

export const removeMessageSuccess = () => ({
	type: actionTypes.REMOVE_MESSAGE_SUCCESS,
})

export const removeMessageFail = (error) => ({
	type: actionTypes.REMOVE_MESSAGE_FAIL,
	payload: error
})

export const setReadedMessageStart = (data) => ({
	type: actionTypes.SET_READED_MESSAGE_START,
	payload: data
})

export const setReadedMessageSuccess = () => ({
	type: actionTypes.SET_READED_MESSAGE_SUCCESS,
})

export const setReadedMessageFail = (error) => ({
	type: actionTypes.SET_READED_MESSAGE_FAIL,
	payload: error
})

export const editMessageStart = (data) => ({
	type: actionTypes.EDIT_MESSAGE_START,
	payload: data
})

export const editMessageSuccess = (data) => ({
	type: actionTypes.EDIT_MESSAGE_SUCCESS,
	payload: data
})

export const editMessageFail = (error) => ({
	type: actionTypes.EDIT_MESSAGE_FAIL,
	payload: error
})

export const likeMessageStart = (data) => ({
	type: actionTypes.LIKE_MESSAGE_START,
	payload: data
})

export const likeMessageSuccess = () => ({
	type: actionTypes.LIKE_MESSAGE_SUCCESS,
})

export const likeMessageFail = (error) => ({
	type: actionTypes.LIKE_MESSAGE_FAIL,
	payload: error
})

export const unlikeMessageStart = (data) => ({
	type: actionTypes.UNLIKE_MESSAGE_START,
	payload: data
})

export const unlikeMessageSuccess = () => ({
	type: actionTypes.UNLIKE_MESSAGE_SUCCESS,
})

export const unlikeMessageFail = (error) => ({
	type: actionTypes.UNLIKE_MESSAGE_FAIL,
	payload: error
})

export const openEditMessageMode = (data) => ({
	type: actionTypes.OPEN_EDIT_MESSAGE_MODE,
	payload: data
})

export const closeEditMessageMode = () => ({
	type: actionTypes.CLOSE_EDIT_MESSAGE_MODE,
})
