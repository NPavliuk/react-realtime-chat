import { call, put, takeLatest } from 'redux-saga/effects'
import { actionTypes } from '@constants/actionTypes'
import {
  signUpFail,
  signUpSuccess,
  signInSuccess,
  signInFail,
  signOutFail,
  signOutSuccess, getUserDataSuccess, getUserDataFail
} from '@store/reducers/userReducer/userActions'
import { signUpWithEmailPassword } from '@api/auth/signUp'
import { getUserData, setUserToDb } from '@api/user/user'
import { signInWithEmailPassword } from '@api/auth/signIn'
import { auth } from '@api/firebase'
import { signOut } from 'firebase/auth'

export function* signUpWithEmailPasswordSaga(props) {
  const email = props.payload.email
  const password = props.payload.password
  const displayName = props.payload.displayName

  try {
    if (email && password) {
      const user = yield call(signUpWithEmailPassword, email, password)
      user.displayName = displayName
      yield call(setUserToDb, user)
      yield put(signUpSuccess(user.uid))
    }
  } catch (err) {
    yield put(signUpFail(err.message))
  }
}

export function* signInWithEmailPasswordSaga(props) {
  const email = props.payload.email
  const password = props.payload.password

  try {
    if (email && password) {
      const user = yield call(signInWithEmailPassword, email, password)
      yield put(signInSuccess(user.uid))
    }
  } catch (err) {
    yield put(signInFail(err.message))
  }
}

export function* signOutSaga() {
  try {
    yield signOut(auth)
    yield put(signOutSuccess())
  } catch (err) {
    yield put(signOutFail(err.message))
  }
}

export function* userDataSaga(props) {
  const uid = props.payload

  try {
    const data = yield call(getUserData, uid)
    console.log(data)
    yield put(getUserDataSuccess(data))
  } catch (err) {
    yield put(getUserDataFail(err.message))
  }
}

export const userSaga = [
  takeLatest(actionTypes.SIGNUP_START, signUpWithEmailPasswordSaga),
  takeLatest(actionTypes.SIGNIN_START, signInWithEmailPasswordSaga),
  takeLatest(actionTypes.SIGNOUT_START, signOutSaga),
  takeLatest(actionTypes.GET_USER_DATA_START, userDataSaga)
]
