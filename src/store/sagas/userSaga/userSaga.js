import { call, put, takeLatest } from 'redux-saga/effects'
import { actionTypes } from '@constants/actionTypes'
import { getUserDataSuccess, getUserDataFail } from '@store/reducers/userReducer/userActions'
import { getUserData } from '@api/user/user'

export function* userDataSaga(props) {
  const uid = props.payload

  try {
    const data = yield call(getUserData, uid)
    yield put(getUserDataSuccess(data))
  } catch (err) {
    yield put(getUserDataFail(err.message))
  }
}

export const userSaga = [,
  takeLatest(actionTypes.GET_USER_DATA_START, userDataSaga)
]
