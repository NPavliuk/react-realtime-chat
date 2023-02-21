import { call, put, takeLatest } from 'redux-saga/effects'
import { actionTypes } from '@constants/actionTypes'
import { getUsers } from '@api/users/getUsers'
import { getUsersFail, getUsersSuccess } from '@store/reducers/usersReducer/usersActions'

export function* getUsersSaga() {
  try {
    const data = yield call(getUsers)
    yield put(getUsersSuccess(data))
  } catch (err) {
    yield put(getUsersFail(err.message))
  }
}

export const usersSaga = [
  takeLatest(actionTypes.GET_USERS_START, getUsersSaga)
]
