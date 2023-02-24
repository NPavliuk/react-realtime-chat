import { actionTypes } from '@constants/actionTypes'

export const openProfileBar = () => ({
  type: actionTypes.OPEN_PROFILE_BAR
})

export const closeProfileBar = () => ({
  type: actionTypes.CLOSE_PROFILE_BAR
})

export const getProfileInfoStart = (data) => ({
  type: actionTypes.GET_PROFILE_INFO_START,
  payload: data
})

export const getProfileInfoSuccess = (profile) => ({
  type: actionTypes.GET_PROFILE_INFO_SUCCESS,
  payload: profile
})

export const getProfileInfoFail = (error) => ({
  type: actionTypes.GET_PROFILE_INFO_FAIL,
  payload: error
})
