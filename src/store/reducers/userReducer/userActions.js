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
