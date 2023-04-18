import { call, put, takeLatest } from 'redux-saga/effects'
import { getUserData } from '@api/user/getUser'
import { getProfileInfoFail, getProfileInfoSuccess } from '@store/reducers/profileReducer/profileActions'
import { actionTypes } from '@constants/actionTypes'

export function* profileInfoSaga(props) {
  const userID = props.payload
	console.log(userID)

  try {
    const data = yield call(getUserData, userID)
    yield put(getProfileInfoSuccess(data))
  } catch (err) {
    yield put(getProfileInfoFail(err.message))
  }
}

export const profileSaga = [
  takeLatest(actionTypes.GET_PROFILE_INFO_START, profileInfoSaga)
]
