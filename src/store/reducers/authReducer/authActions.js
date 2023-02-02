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

export const signOutStart = () => ({
  type: actionTypes.SIGN_OUT_START
})

export const signOutSuccess = () => ({
  payload: null,
  type: actionTypes.SIGN_OUT_SUCCESS
})

export const signOutFail = (error) => ({
  payload: error,
  type: actionTypes.SIGN_OUT_FAIL
})

export const setAuthStatus = (user) => ({
  payload: user,
  type: actionTypes.SET_AUTH_STATUS
})
