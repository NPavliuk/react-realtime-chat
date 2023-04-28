import { actionTypes } from '@constants/actionTypes'

export const signUpStart = (data) => ({
  payload: data,
  type: actionTypes.SIGN_UP_START
})

export const signUpSuccess = (user) => ({
  payload: user,
  type: actionTypes.SIGN_UP_SUCCESS
})

export const signUpFail = (error) => ({
  payload: error,
  type: actionTypes.SIGN_UP_FAIL
})

export const signInStart = (data) => ({
  type: actionTypes.SIGN_IN_START,
  payload: data
})

export const signInSuccess = (user) => ({
  payload: user,
  type: actionTypes.SIGN_IN_SUCCESS
})

export const signInFail = (error) => ({
  payload: error,
  type: actionTypes.SIGN_IN_FAIL
})

export const signOutStart = (data) => ({
  type: actionTypes.SIGN_OUT_START,
	payload: data
})

export const signOutSuccess = () => ({
  payload: null,
  type: actionTypes.SIGN_OUT_SUCCESS
})

export const signOutFail = (error) => ({
  payload: error,
  type: actionTypes.SIGN_OUT_FAIL
})

export const watchSessionStart = () => ({
	type: actionTypes.WATCH_SESSION_START,
})

export const watchSessionSuccess = (id) => ({
  type: actionTypes.WATCH_SESSION_SUCCESS,
	payload: id
})

export const watchSessionFail = (error) => ({
	type: actionTypes.WATCH_SESSION_FAIL,
	payload: error
})

export const updatePasswordStart = (data) => ({
  payload: data,
  type: actionTypes.UPDATE_PASSWORD_START
})

export const updatePasswordSuccess = () => ({
  type: actionTypes.UPDATE_PASSWORD_SUCCESS
})

export const updatePasswordFail = (error) => ({
  payload: error,
  type: actionTypes.UPDATE_USER_DATA_FAIL
})
