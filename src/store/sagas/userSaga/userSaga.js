import { call, put, takeLatest } from 'redux-saga/effects'
import { signUpFail, signUpSuccess } from '@store/reducers/userReducer/userActions'
import { signUpWithEmailPassword } from '@api/auth/signIn'
import { actionTypes } from '@constants/actionTypes'

export function* signUpWithEmailPasswordSaga(props) {
  const email = props.payload.email
  const password = props.payload.password

  try {
    if (email && password) {
      const user = yield call(signUpWithEmailPassword, email, password)
      yield put(signUpSuccess(user))
    }
  } catch (err) {
    yield put(signUpFail(err.message))
  }
}

export const userSaga = [
  takeLatest(actionTypes.SIGNUP_START, signUpWithEmailPasswordSaga)
]
