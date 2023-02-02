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
