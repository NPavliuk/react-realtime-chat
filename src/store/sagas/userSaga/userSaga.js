import { call, put, takeLatest } from 'redux-saga/effects'
import { signUpFail, signUpSuccess, signInSuccess, signInFail } from '@store/reducers/userReducer/userActions'
import { setUserToDb, signUpWithEmailPassword } from '@api/auth/signUp'
import { signInWithEmailPassword } from '@api/auth/signIn'
import { actionTypes } from '@constants/actionTypes'

export function* signUpWithEmailPasswordSaga(props) {
  const email = props.payload.email
  const password = props.payload.password
  const displayName = props.payload.displayName

  try {
    if (email && password) {
      const user = yield call(signUpWithEmailPassword, email, password)
      user.displayName = displayName
      yield call(setUserToDb, user)
      yield put(signUpSuccess(user))
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
      yield put(signInSuccess(user))
    }
  } catch (err) {
    yield put(signInFail(err.message))
  }
}

export const userSaga = [
  takeLatest(actionTypes.SIGNUP_START, signUpWithEmailPasswordSaga),
  takeLatest(actionTypes.SIGNIN_START, signInWithEmailPasswordSaga)
]
