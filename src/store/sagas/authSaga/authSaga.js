import { call, put, takeLatest } from 'redux-saga/effects'
import { actionTypes } from '@constants/actionTypes'
import { signUpFail, signUpSuccess, signInSuccess, signInFail, signOutFail, signOutSuccess } from '@store/reducers/authReducer/authActions'
import { signUpWithEmailPassword } from '@api/auth/signUp'
import { signInWithEmailPassword } from '@api/auth/signIn'
import { setUserToDb } from '@api/user/user'
import { auth } from '@api/firebase'
import { signOut } from 'firebase/auth'
import toast from 'react-hot-toast'
import { messages } from '@constants/validationMessages'
import { createAndDispatchSignInEvent, createAndDispatchSignOutEvent } from '@helpers/customEvents'

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
      yield call(createAndDispatchSignInEvent)
      yield call(toast.success, messages.signUpSuccess)
    }
  } catch (err) {
    yield put(signUpFail(err.message))
    yield call(toast.success, err.message)
  }
}

export function* signInWithEmailPasswordSaga(props) {
  const email = props.payload.email
  const password = props.payload.password

  try {
    if (email && password) {
      const res = yield call(signInWithEmailPassword, email, password)
      if (res.uid) {
        yield put(signInSuccess(res))
        yield call(createAndDispatchSignInEvent)
        yield call(toast.success, messages.signInSuccess)
      } else {
        yield put(signInFail(res))
        yield call(toast.success, res)
      }
    }
  } catch (err) {
    yield put(signInFail(err.message))
    yield call(toast.success, err.message)
  }
}

export function* signOutSaga() {
  try {
    yield signOut(auth)
    yield put(signOutSuccess())
    yield call(createAndDispatchSignOutEvent)
  } catch (err) {
    yield put(signOutFail(err.message))
    yield call(toast.success, err.message)
  }
}

export const authSaga = [
  takeLatest(actionTypes.SIGN_UP_START, signUpWithEmailPasswordSaga),
  takeLatest(actionTypes.SIGN_IN_START, signInWithEmailPasswordSaga),
  takeLatest(actionTypes.SIGN_OUT_START, signOutSaga)
]
