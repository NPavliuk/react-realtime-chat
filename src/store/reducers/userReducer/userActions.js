import { actionTypes } from '@constants/actionTypes'

export const signUpStart = (data) => ({
  payload: data,
  type: actionTypes.SIGNUP_START
})

export const signUpSuccess = (user) => ({
  payload: user,
  type: actionTypes.SIGNUP_SUCCESS
})

export const signUpFail = (error) => ({
  payload: error,
  type: actionTypes.SIGNUP_FAIL
})

export const signInStart = (data) => ({
  type: actionTypes.SIGNIN_START,
  payload: data
})

export const signInSuccess = (user) => ({
  payload: user,
  type: actionTypes.SIGNIN_SUCCESS
})

export const signInFail = (error) => ({
  payload: error,
  type: actionTypes.SIGNIN_FAIL
})

export const signOutStart = () => ({
  type: actionTypes.SIGNOUT_START
})

export const signOutSuccess = () => ({
  payload: null,
  type: actionTypes.SIGNOUT_SUCCESS
})

export const signOutFail = (error) => ({
  payload: error,
  type: actionTypes.SIGNOUT_FAIL
})

export const getUserDataStart = (data) => ({
  payload: data,
  type: actionTypes.GET_USER_DATA_START
})

export const getUserDataSuccess = (data) => ({
  payload: data,
  type: actionTypes.GET_USER_DATA_SUCCESS
})

export const getUserDataFail = (error) => ({
  payload: error,
  type: actionTypes.GET_USER_DATA_FAIL
})


export const setCurrentUser = (user) => ({
  payload: user,
  type: actionTypes.SET_USER
})
