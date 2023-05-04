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

export const watchUsersStatusStart = () => ({
	type: actionTypes.WATCH_USERS_STATUS_START,
})

export const watchUsersStatusSuccess = (users) => ({
	type: actionTypes.WATCH_USERS_STATUS_SUCCESS,
	payload: users
})

export const watchUsersStatusFail = (error) => ({
	type: actionTypes.WATCH_USERS_STATUS_SUCCESS,
	payload: error
})
