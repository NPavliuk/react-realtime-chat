import { actionTypes } from '@constants/actionTypes'

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

export const updateUserDataStart = (data) => ({
  payload: data,
  type: actionTypes.UPDATE_USER_DATA_START
})

export const updateUserDataSuccess = (data) => ({
  payload: data,
  type: actionTypes.UPDATE_USER_DATA_SUCCESS
})

export const updateUserDataFail = (error) => ({
  payload: error,
  type: actionTypes.UPDATE_USER_DATA_FAIL
})
