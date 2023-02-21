import { actionTypes } from '@constants/actionTypes'

export const getUsersStart = () => ({
  type: actionTypes.GET_USERS_START
})

export const getUsersSuccess = (users) => ({
  type: actionTypes.GET_USERS_SUCCESS,
  payload: users
})

export const getUsersFail = (error) => ({
  type: actionTypes.GET_USERS_FAIL,
  payload: error
})
