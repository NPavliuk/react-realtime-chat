import { call, put, takeLatest } from 'redux-saga/effects'
import {
  getUserDataSuccess,
  getUserDataFail,
  updateUserDataSuccess,
  updateUserDataFail
} from '@store/reducers/userReducer/userActions'
import { getUserData } from '@api/user/getUser'
import { actionTypes } from '@constants/actionTypes'
import { updateUserData } from '@api/user/updateUser'
import toast from 'react-hot-toast'
import { messages } from '@constants/validationMessages'

export function* userDataSaga(props) {
  const uid = props.payload

  try {
    const data = yield call(getUserData, uid)
    yield put(getUserDataSuccess(data))
  } catch (err) {
    yield put(getUserDataFail(err.message))
  }
}

export function* updateUserDataSaga(props) {
  const user = props.payload

  try {
    yield call(updateUserData, user)
    yield put(updateUserDataSuccess(user))
    yield call(toast.success(messages.profileUpdated))
  } catch (err) {
    yield put(updateUserDataFail(err.message))
  }
}

export const userSaga = [
  takeLatest(actionTypes.GET_USER_DATA_START, userDataSaga),
  takeLatest(actionTypes.UPDATE_USER_DATA_START, updateUserDataSaga)
]
