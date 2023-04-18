import { call, put, takeLatest } from 'redux-saga/effects'
import { getAllUsers } from '@api/users/getAllUsers'
import { getUsersFail, getUsersSuccess } from '@store/reducers/usersReducer/usersActions'
import { actionTypes } from '@constants/actionTypes'

export function* getUsersSaga() {
  try {
    const data = yield call(getAllUsers)
    yield put(getUsersSuccess(data))
  } catch (err) {
    yield put(getUsersFail(err.message))
  }
}

export const usersSaga = [
  takeLatest(actionTypes.GET_USERS_START, getUsersSaga)
]
