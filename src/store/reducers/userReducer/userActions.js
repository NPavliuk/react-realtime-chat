import { actionTypes } from '@constants/actionTypes'

export const signUpStart = (data) => ({
  type: actionTypes.SIGNUP_START,
  payload: data
})

export const signUpSuccess = (user) => ({
  payload: user,
  type: actionTypes.SIGNUP_SUCCESS
})

export const signUpFail = (error) => ({
  payload: error,
  type: actionTypes.SIGNUP_FAIL
})
