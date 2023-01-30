import { call, put, takeLatest } from 'redux-saga/effects'
import { signUpFail, signUpSuccess } from '@store/reducers/userReducer/userActions'
import { setUserToDb, signUpWithEmailPassword } from '@api/auth/signUp'
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

export const userSaga = [
  takeLatest(actionTypes.SIGNUP_START, signUpWithEmailPasswordSaga)
]
